
const Client = require("@microsoft/microsoft-graph-client").Client;

const options = {
	authProvider: {
        getAccessToken: () => Promise.resolve("eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYSm1pelRXVF9ja0paUlMtVkZBeVdTS2VhY0tSYm1iN2d5SElUT2N6MmVJcE0zNXd5bVVhMFRYQXlpSXVyME5xWUZLaEpFRkx5dFU4VjI0cVk3dDV1cnlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgvIiwiaWF0IjoxNTYyMDk5NTgwLCJuYmYiOjE1NjIwOTk1ODAsImV4cCI6MTU2MjEwMzQ4MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZTmhjcHhsWDh6UFRwN0R5TkYvakFxbnFyMlluVllON0ErZVgvRFRRN3R2TGx3UUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIGV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpcGFkZHIiOiI5Mi40MC4yNDguMTQxIiwibmFtZSI6IkR1cG9udCIsIm9pZCI6ImJhMjQ2MWQ2LTRmZWMtNDI2OS05NDMzLTlhYmNjOTViOTA4ZSIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMDRGNzJEMDFFIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDb250YWN0cy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWRXcml0ZSBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUW9ESjAyVjJXX3RvTWhqdUY4VWdRSTlRWXBpVjJMSFJJX0xjVHVSbUFmWSIsInRpZCI6ImY0YjY0MjMwLTE5ZWYtNDdkNS1hNzVmLWJjYWEwMTBmY2QyOCIsInVuaXF1ZV9uYW1lIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXBuIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXRpIjoiVDAzem1DZkp4MEM4NFZ3a3FTQXJBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJPbXFBUDJBNl9oMVc3RWIyMWZmU0MtQUhOc0JZVHZaQ19IRk1PeUxsalJRIn0sInhtc190Y2R0IjoxNTYxMTI5NTM5fQ.Z8n1VOFklb2-y_MxPCjiWtmiLi82JILVLgpWultw-0_Xb7tnn-91oejdn4owglgGoDW_6VkGkxQrKrrVeBYGs04xNtaRi0pBLjALIdBkCMXERkolMyrUgq7dYuTHenPXlvpaWiqxZeB6ylumv2RSdQdocqTLlMaKXNjJAfLyNxtlTp3z6biKSpEdZht8MMnAOmOEI14y7ynRHfdXU0l2mtVXBL9O2yZvjXuYJo1l-gj1sWf5RJvg4RXt5A1DL5wfvySpzTM6Us1FaT74RZqDeAllOsK5m8rBEL-aoWx-_wVCjNR-e48pLMN6uZMxEJyIb3smBhXcK3ga3fdORj4EwA")
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
