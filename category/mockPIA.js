const metadata = [
    {
        "subject": "Amazon - Invoice 28/06/2019",
        "documentId" : "74667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T15:50:10.411Z",
        "label" : "Amazon",
        "amount" : 179.0,
        "type": "Achat"
    },
    {
        "subject": "Facture relative à votre séjour - ibis budget Rueil Malmaison (F) / Your invoice at ibis budget Rueil Malmaison (F)",
        "documentId" : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T16:50:10.411Z",
        "label" : "Ibis",
        "amount" : 144.58,
        "type": "Achat"
    },
    {
        "documentId" : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        "date" : "2019-07-02T16:50:10.411Z",
        "label" : "Netflix",
        "amount" : 8.58,
        "type": "Achat"
    }
];


function processDocuments(mails = []) {
    return mails.map(({subject, id}) => {
       return {
           ...metadata.find((meta) => meta.subject === subject),
           emailId: id
       }
    });
}

module.exports = {
    processDocuments
};
