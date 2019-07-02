const metadata = [
    {
        "documentId" : "74667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T15:50:10.411Z",
        "label" : "Amazon",
        "amount" : 179.0,
        "type": "Purchase"
    },
    {
        "documentId" : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T16:50:10.411Z",
        "label" : "Ibis",
        "amount" : 144.58,
        "type": "Sales"
    },

    {
        "documentId" : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T16:50:10.411Z",
        "label" : "Netflix",
        "amount" : 8.58,
        "type": "Sales"
    }
];


function processDocuments(mails = []) {
    return metadata.slice(0, mails.length)
}

module.exports = {
    processDocuments
};
