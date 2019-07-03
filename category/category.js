
const {getMatchersCollection} = require("./mongodbConnect.js")
const {categoryMatched, categoryRecorded, categoryPurchase, categorySale} = require('../config.js');
const {processDocuments} = require("./mockPIA.js");
const {fetchMails, updateTags} = require("./updateMails.js");


function categoryExist(category) {
   const categories = [categoryMatched, categoryRecorded, categoryPurchase, categorySale];
   return categories.includes(category);
}


function getTags(documents) {
    return documents.map(({emailId}, index) => {
        const {type} = documents[index];
        return {
            tag: type,
            emailId,
        };
    });
}

async function main () {
    console.log("Starting main");
    const mails = await fetchMails();
    const mailsOfInterest = mails.filter(({categories = []}) => {
        return !categories.some(categoryExist);
    });

    const mailsInfo = await processDocuments(mailsOfInterest);

    // Tag documents
    const tagsForMail = getTags(mailsInfo);
    const done = await updateTags(tagsForMail);

    // Flag emails
    if (done && mailsInfo.length) {
        const collectionMatchers = await getMatchersCollection();
        await collectionMatchers.insert(mailsInfo);
    }

    // setTimeout(main, intervalSeconds * 1000);
};

main();
