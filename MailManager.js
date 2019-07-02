
const Client = require("@microsoft/microsoft-graph-client").Client;

const options = {
	authProvider: {
        getAccessToken: () => Promise.resolve("eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEQ29NcGpKWHJ4VHE5Vkc5dGUtN0ZYOWZaZ3M3VWg5M2RPc1BYTzhFVHNBMmg2SFc0LWl1RHJuZ0NsNHJfYmhzbllFZUpoSy1rcjRvN1ZpS1RpT0RiZkN6NThRRGkxamdoR19oS2pybnlLYmlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIiwia2lkIjoiQ3RmUUM4TGUtOE5zQzdvQzJ6UWtacGNyZk9jIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNGI2NDIzMC0xOWVmLTQ3ZDUtYTc1Zi1iY2FhMDEwZmNkMjgvIiwiaWF0IjoxNTYyMDkxNzgwLCJuYmYiOjE1NjIwOTE3ODAsImV4cCI6MTU2MjA5NTY4MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyWmdZQ2l1K3BkZks1bFRabk4waDJIVWpYWC9tN2pQL2pIeVpHcVFxZUU0NWNqd3JRa0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIGV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJpcGFkZHIiOiI3Ny4xMzAuNzEuMTMyIiwibmFtZSI6IkR1cG9udCIsIm9pZCI6ImJhMjQ2MWQ2LTRmZWMtNDI2OS05NDMzLTlhYmNjOTViOTA4ZSIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMDRGNzJEMDFFIiwic2NwIjoiQ2FsZW5kYXJzLlJlYWRXcml0ZSBDb250YWN0cy5SZWFkV3JpdGUgRmlsZXMuUmVhZFdyaXRlLkFsbCBNYWlsLlJlYWRXcml0ZSBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIE5vdGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIFBlb3BsZS5SZWFkIHByb2ZpbGUgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUYXNrcy5SZWFkV3JpdGUgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUW9ESjAyVjJXX3RvTWhqdUY4VWdRSTlRWXBpVjJMSFJJX0xjVHVSbUFmWSIsInRpZCI6ImY0YjY0MjMwLTE5ZWYtNDdkNS1hNzVmLWJjYWEwMTBmY2QyOCIsInVuaXF1ZV9uYW1lIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXBuIjoiZHVwb250QGRldmxvb3Bsb25kb24ub25taWNyb3NvZnQuY29tIiwidXRpIjoiVnB3d0xyRjIyRVc3aHJLaHRmc0ZBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJPbXFBUDJBNl9oMVc3RWIyMWZmU0MtQUhOc0JZVHZaQ19IRk1PeUxsalJRIn0sInhtc190Y2R0IjoxNTYxMTI5NTM5fQ.f51QkhHiWKtd4uTvf-FRXpQP03jdSoDJP6MymMozDWA3QjnkUOOF2vsq2bmz4rXbFLy2XVQ4uYAQVuSHwsDKfNB4aHylsqHR6TU770jaiLMDJkB9bdAbGNqSyojvffZIHEWMfCuettGRj4HJQcAxOLeW8vp7GJJuoQo9gnBveIsNGw_h7EvnQ7CocAwnTGj0tPosw2xz4hZl7wxbhHAQmMoK2mNcZwT9Sz5fJq8bo6HwXB-JvSO3-Ajy5Cqh16tmqeMyypHwWnJES6ULV4hEaJT1BRcMqgdEI8Ogj9oxcVys_N_Tow_HC_c4z_5_fcwYWuID0v-XEI9XFyg00kGxAA")
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
        const email =  await this.client.api(`/users/${address}/messages/${emailId}`)
            .select(["categories"]).get();
        const count = email.categories.length;
        const tags = email.categories.filter(c => c !== tag);
        if (count === tags.length) {
            return
        }
        await this.client.api(`/users/${address}/messages/${emailId}`)
            .patch({"categories": tags})
    }
}

exports.MailManager = new MailManager();
