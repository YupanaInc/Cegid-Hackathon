const Client = require("@microsoft/microsoft-graph-client").Client;
const request = require('request-promise-native');

const options = {
    authProvider: {
        getAccessToken: async () => {
            const result = await request.post('https://login.microsoftonline.com/devlooplondon.onmicrosoft.com/oauth2/token')
                .form({
                    client_id: '1a364f56-b776-48e3-ba20-6d1672cb9a08',
                    client_secret: '-Od52?vW+C0Z-62jaTyZCwh@eRL-9AP3',
                    resource: 'https://graph.microsoft.com',
                    grant_type: 'client_credentials'
                }).json(true);
            return result.access_token;
        }
    }
};

class MailManager {
    constructor() {
        this.client = Client.initWithMiddleware(options);
    }

    /**
     *
     * @param {string} address
     * @param {Date} fromDate
     * @param {string[]} withTags
     * @param {string[]} withoutTags
     * @return {{id:string, subject:string}[]}
     */
    async getEmails(address, fromDate, withTags, withoutTags) {
        return (await this.client.api(`/users/${address}/messages`)
                .select(["sender", "subject", "categories"]).get()
        ).value.filter(mes => {
            return (!withTags || withTags.length === 0 || withTags.some(c => mes.categories.includes(c)))
                && !mes.categories.some(c => (withoutTags || []).includes(c))
        })
    }

    /**
     *
     * @param {string} address
     * @param {string} emailId
     * @param {string} tag
     * @return void
     */
    async setTag(address, emailId, tag) {
        const email = await this.client.api(`/users/${address}/messages/${emailId}`)
            .select(["categories"]).get();
        const tags = email.categories;
        if (tags.includes(tag)) {
            return
        }
        tags.push(tag);
        await this.client.api(`/users/${address}/messages/${emailId}`)
            .patch({"categories": tags})
    }

    /**
     *
     * @param {string} address
     * @param {string} emailId
     * @param {string} tag
     * @return void
     */
    async removeTag(address, emailId, tag) {
        const email = await this.client.api(`/users/${address}/messages/${emailId}`)
            .select(["categories"]).get();
        const count = email.categories.length;
        const tags = email.categories.filter(c => c !== tag);
        if (count === tags.length) {
            return
        }
        await this.client.api(`/users/${address}/messages/${emailId}`)
            .patch({"categories": tags})
    }

    /**
     *
     * @param {string} address
     * @param {string} subject
     * @param {string} body
     * @return void
     */
    async sendEmail(address, subject, body) {
        return await this.client.api(`/users/${address}/sendMail`)
            .post({
                message: {
                    subject,
                    body: {contentType: "html", content: body},
                    toRecipients: [{emailAddress: {address}}]
                }
            })
    }
}

exports.MailManager = new MailManager();
