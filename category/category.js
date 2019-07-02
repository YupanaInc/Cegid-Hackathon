
const {getMatchersCollection} = require("./mongodbConnect.js")
const {intervalSeconds} = require('../config.js');

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


    setTimeout(main, intervalSeconds * 1000);
};

main();
