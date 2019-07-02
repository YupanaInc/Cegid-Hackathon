const Client = require("@microsoft/microsoft-graph-client").Client;

const options = {
	authProvider: {
        getAccessToken: () => Promise.resolve("eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYejUwek1td19oSEtPWDhnOWNJRDhVcm1WdzlkTWxvTHItcXJZd3dEdG9DYUFXM2F1UC14VlFxemhnY24wVFN0enFTbDBrNERCVjhGMzdvTjJtcXpyakNBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgvIiwiaWF0IjoxNTYyMDg1NzgwLCJuYmYiOjE1NjIwODU3ODAsImV4cCI6MTU2MjA4OTY4MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZTWpZcWE0ZGZjaERaMFBPTWRudFU3b2lsK25acDYxNDNMRkhxT3RnTjhmVXdrWUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIGV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpcGFkZHIiOiI3Ny4xMzAuNzEuMTMyIiwibmFtZSI6IkR1cG9udCIsIm9pZCI6ImJhMjQ2MWQ2LTRmZWMtNDI2OS05NDMzLTlhYmNjOTViOTA4ZSIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMDRGNzJEMDFFIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDb250YWN0cy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWRXcml0ZSBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUW9ESjAyVjJXX3RvTWhqdUY4VWdRSTlRWXBpVjJMSFJJX0xjVHVSbUFmWSIsInRpZCI6ImY0YjY0MjMwLTE5ZWYtNDdkNS1hNzVmLWJjYWEwMTBmY2QyOCIsInVuaXF1ZV9uYW1lIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXBuIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXRpIjoiaE1FYzJXN1o4VTJTMlZXQ3R3c0FBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJPbXFBUDJBNl9oMVc3RWIyMWZmU0MtQUhOc0JZVHZaQ19IRk1PeUxsalJRIn0sInhtc190Y2R0IjoxNTYxMTI5NTM5fQ.Q-IHQ3s_SVmUPSBcpV2mZXV4qUK4rmLnZH1-Gb8QJA5dBPjSvDFq_bOSjd1gSAMd-_ICKd-97qpsxzVlYja4Ejf54pkVxwzzP_JGRRpgxh0f2KZLSt-nbzot8TARiq67CVHo8rGkRnKqJGN30u6G9wYASlVR0J9Sy0LUpVAgcb0udgtnHRXbt7aLf7cxzlk4bHDLFlGWMA2JPRu7aTx2Ec1iER8QaVgYPrSgkx57gyWujaHx9tudb29APXFhLknk0FL8GHKPjGYsEKFWC93eNoPLnPhwLqcPRLqFq05wTnV2jp7cmfh8fO0IqKJqk3VCT6Ip57UQ9j5zyEcT8R2xUw")
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
     */
    setTag(address, emailId, tag) {
    }
}

exports.MailManager = new MailManager();
