
const {getMatchersCollection} = require("./mongodbConnect.js")
const {intervalSeconds} = require('../config.js');
const {processDocuments} = require("./mockPIA.js");
const {fetchMails, updateTags} = require("./mockMails.js");

function getTags(mailsOfInterest, documents) {
    return mailsOfInterest.map(({emailId}, index) => {
        const {type} = documents[index];
        return {
            tag: {
                type
            },
            emailId,
        };
    })
}

function createMatchers(_docs, _mailInformations) {
    return _docs.map((doc, index) => {
        const {userMail, emailId} = _mailInformations[index];
        return {
            userMail,
            emailId,
            ...doc
        }
    });
}


async function main () {
    console.log("starting main");
    const mails = await fetchMails();
    const mailsOfInterest = mails.filter(({attachment}) => {
        return attachment && attachment.length;// get mails of interest
    });

    const documents = await processDocuments(mailsOfInterest);
    // Tag documents
    const mailsInformation = getTags(mailsOfInterest, documents);
    const done = await updateTags(mailsInformation);
    // Flag emails
    if (done) {
        const collectionMatchers = await getMatchersCollection();
        const matchers = createMatchers(documents, mailsOfInterest)
        await collectionMatchers.insert(matchers);
        console.log("insert matchers");
    }

    setTimeout(main, intervalSeconds * 1000);
};

main();
