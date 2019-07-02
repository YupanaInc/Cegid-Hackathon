
const {getMatchersCollection} = require("./mongodbConnect.js")
const {intervalSeconds} = require('../config.js');
const {processDocuments} = require("./mockPIA.js");
const {fetchMails, updateTags} = require("./updateMails.js");

function getTags(documents) {
    return documents.map(({emailId}, index) => {
        const {type} = documents[index];
        return {
            tag: type,
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
    const mailsOfInterest = mails.filter(({categories}) => {
        return categories && !categories.length;// get mails of interest
    });

    const mailsInfo = await processDocuments(mailsOfInterest);
    // Tag documents
    const tagsForMail = getTags(mailsInfo);
    const done = await updateTags(tagsForMail);
    // Flag emails\\
    if (done) {
        const collectionMatchers = await getMatchersCollection();
        const matchers = createMatchers(mailsInfo, mailsOfInterest)
        await collectionMatchers.insert(matchers);
    }

    setTimeout(main, intervalSeconds * 1000);
};

main();
