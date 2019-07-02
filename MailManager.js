
const Client = require("@microsoft/microsoft-graph-client").Client;

const options = {
	authProvider: {
        getAccessToken: () => Promise.resolve("eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYTi1TbGhJSjRhel93ejg3RlhtVlhvRGpBVDVzWW4tWUdNenNEMVZxTGtsTjVWTFBsUXltN1MtRjVfajFtMEN5Yk9XMXpNNkZERU5xSkhWVWJ0VTdEeHlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgvIiwiaWF0IjoxNTYyMDk1OTgwLCJuYmYiOjE1NjIwOTU5ODAsImV4cCI6MTU2MjA5OTg4MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhMQUFBQUt2L0pOcWRDbGpBbUg3UEF3d0RRbHlOSGR0cVdvSWwxeDhzdk9jK3FRdk09IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBleHBsb3JlciIsImFwcGlkIjoiZGU4YmM4YjUtZDlmOS00OGIxLWE4YWQtYjc0OGRhNzI1MDY0IiwiYXBwaWRhY3IiOiIwIiwiaXBhZGRyIjoiNzcuMTMwLjcxLjEzMiIsIm5hbWUiOiJEdXBvbnQiLCJvaWQiOiJiYTI0NjFkNi00ZmVjLTQyNjktOTQzMy05YWJjYzk1YjkwOGUiLCJwbGF0ZiI6IjUiLCJwdWlkIjoiMTAwMzIwMDA0RjcyRDAxRSIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgQ29udGFjdHMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgTWFpbC5SZWFkV3JpdGUgTWFpbGJveFNldHRpbmdzLlJlYWRXcml0ZSBOb3Rlcy5SZWFkV3JpdGUuQWxsIG9wZW5pZCBQZW9wbGUuUmVhZCBwcm9maWxlIFNpdGVzLlJlYWRXcml0ZS5BbGwgVGFza3MuUmVhZFdyaXRlIFVzZXIuUmVhZEJhc2ljLkFsbCBVc2VyLlJlYWRXcml0ZSBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IlFvREowMlYyV190b01oanVGOFVnUUk5UVlwaVYyTEhSSV9MY1R1Um1BZlkiLCJ0aWQiOiJmNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgiLCJ1bmlxdWVfbmFtZSI6ImR1cG9udEBkZXZsb29wbG9uZG9uLm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6ImR1cG9udEBkZXZsb29wbG9uZG9uLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InpKZGNHMmxtU1VLNGlJNjktMjVfQUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiT21xQVAyQTZfaDFXN0ViMjFmZlNDLUFITnNCWVR2WkNfSEZNT3lMbGpSUSJ9LCJ4bXNfdGNkdCI6MTU2MTEyOTUzOX0.X9LD2bVBlfE6g1AbRWeG0C_VVV8q8DlCNEZ-8MXozomVmNBF5y52SNhva0glELo7DoaZc7aWzqekv-Rtogj2ilq2mRTYH3zypmF4zX8dtXK1lr6TjmtG1lSHTx6RkBDnkFj_uoRmEdRvtChyOuPs3Yz28UXMNcgUOJwk3MIPe0s3fAUdh_XKTtF3d23_5OruMbk_PmByo2ciEYUkKa5I3euCDipB1mVwcE1f05qUx3LKRcgR4VJK9YQZJkgpOKz5YaWdZdIZP28r_9-8Ud1SMhEJAOcn85vzq1ohklaNW0Ye_vcDr2fx49txYVNRQ3IL8hgHKWRYYcKABWynaYmaCw")
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
        ).value.filter(mes=> {
            return (!withTags || withTags.length === 0 || withTags.some(c => mes.categories.includes(c)))
            && !mes.categories.some(c=> (withoutTags || []).includes(c))
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
        const email =  await this.client.api(`/users/${address}/messages/${emailId}`)
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
            .post({ message: {
                subject,
                body:{contentType:"html", content: body},
                toRecipients:[{emailAddress: {address}}]
            }})
    }
}

exports.MailManager = new MailManager();
