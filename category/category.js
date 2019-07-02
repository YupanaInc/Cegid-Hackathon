
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

async function main () {
    console.log("starting main");
    const mails = await fetchMails();
    const mailsOfInterest = mails.filter(({categories = []}) => {
        return !categories.filter(cat => cat !== "Passé en banque").length;
    });

    const mailsInfo = await processDocuments(mailsOfInterest);
    // Tag documents
    const tagsForMail = getTags(mailsInfo);
    const done = await updateTags(tagsForMail);
    // Flag emails\\
    if (done && mailsInfo.length) {
        const collectionMatchers = await getMatchersCollection();
        await collectionMatchers.insert(mailsInfo);
    }

    setTimeout(main, intervalSeconds * 1000);
};

main();
