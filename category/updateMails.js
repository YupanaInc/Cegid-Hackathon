const mailManager = require('../MailManager.js').MailManager;
const {emailAccount} = require('../config.js');

async function fetchMails() {
    const result = await mailManager.getEmails(emailAccount);
    return result.map(res => ({...res, userEmail: emailAccount}));
}

async function updateTags(mailsInformation) {
    return Promise.all(mailsInformation.map(mails => {
        return mailManager.setTag(emailAccount, mails.emailId, mails.tag);
    }));
}

module.exports = {
    fetchMails,
    updateTags
}