
const {  
    getPIADocumentsCollection,
    getMatchersCollection
} = require("./mongodbConnect.js")

// REST POST DOCUMENT FROM PIA => RETURN METADATA // mock





// GET LIST OF LAST MAILS => API from Alex
async function fetchMails() {
    return {

    }
}


async function processPIA() {
    // mock ?

}


async function tagDocuments() {
    // mock


}


async function main () {

    console.log("starting main");
    const collectionDocuments = await getPIADocumentsCollection();
    console.log("collection documents");
    const cursor = await collectionDocuments.find({});
    const documents = await cursor.toArray();
    console.log(documents);

    const collectionMatchers = await getMatchersCollection();
    const cursorMatchers = await collectionMatchers.find({});
    const matchers = await cursorMatchers.toArray();
    console.log(matchers);

    // const mails = await fetchMails();

    // const interestMails = mails.filter((mail) => {
    //     // get mails of interest
    //     return true;
    // });

    // const documents = await processPIA(interestMails);



};

main();
