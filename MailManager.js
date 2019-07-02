
const Client = require("@microsoft/microsoft-graph-client").Client;

const options = {
	authProvider: {
        getAccessToken: () => Promise.resolve("eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYTDQ0cVRPaFFUem9IZXR4SF9ab0VVWDZqUnpncEJpa2xXMUhrQVFZT2h5SHo2QTR2YmF1Ry1RdmFpUTFidjdaMThvUjM4TGJMczhqODdlcVhzWjFSbENBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgvIiwiaWF0IjoxNTYyMDg5OTgwLCJuYmYiOjE1NjIwODk5ODAsImV4cCI6MTU2MjA5Mzg4MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZSkRrOUd1SWZ6VERKVGxnN3MyVkRxZURWUjNzUmMrZDFEUjJZV2V1N0dkYi94TUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIGV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpcGFkZHIiOiI3Ny4xMzAuNzEuMTMyIiwibmFtZSI6IkR1cG9udCIsIm9pZCI6ImJhMjQ2MWQ2LTRmZWMtNDI2OS05NDMzLTlhYmNjOTViOTA4ZSIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMDRGNzJEMDFFIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDb250YWN0cy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWRXcml0ZSBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUW9ESjAyVjJXX3RvTWhqdUY4VWdRSTlRWXBpVjJMSFJJX0xjVHVSbUFmWSIsInRpZCI6ImY0YjY0MjMwLTE5ZWYtNDdkNS1hNzVmLWJjYWEwMTBmY2QyOCIsInVuaXF1ZV9uYW1lIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXBuIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXRpIjoiQ0VialNYZ0VGVWlCOFR6NnRLb0RBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJPbXFBUDJBNl9oMVc3RWIyMWZmU0MtQUhOc0JZVHZaQ19IRk1PeUxsalJRIn0sInhtc190Y2R0IjoxNTYxMTI5NTM5fQ.JdG467kub2cr6FSAduV2i07XsNpe6FL5jGZxa6rq8xS3aMlIGRMapdh7wQVEHcWrkZ4GOIDv9C_aqwFT_-3DWlr94oWE9jo4Zu6syF4JdOEtbvwcJqRf6u98NF001Lu-aY5VQ11hBY2vvD04TpKkUvi1mADr7tKNXHGjkiY2wrI7-r4KsEg24PIDVyu_kBKRs7pdwnZPuv8G_Rjp1xbFCoisdcByabucxzwV8IHEQlZLAvljH6SaPrgjEmz8e2EkeAtTX21SxtZTp_YLtOT85ym8zOHTCk_1MBzamAHNQMruTIgC6RqY4dVi6XRADc0SDIqnlf2Kkb5zXi6A4KFZGQ")
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
