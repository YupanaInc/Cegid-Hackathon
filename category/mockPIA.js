const metadata = [
    {
        subject: "Amazon",
        documentId : "74667120-b9f4-42a5-8e07-e1b6bad086cf",
        date : "2019-07-02T15:50:10.411Z",
        label : "Amazon",
        amount : 179.0,
        type: "Achat"
    },
    {
        subject: "IBIS",
        documentId : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        date : "2019-07-02T16:50:10.411Z",
        label : "Ibis",
        amount : 144.58,
        type: "Achat"
    },
    {
        subject: "Google",
        documentId : "84667120-b9f4-42a5-8e07-e1b6bad086cf",
        date : "2019-07-02T16:50:10.411Z",
        label : "Google",
        amount : 55.08,
        type: "Vente"
    }
];

function processDocuments(mails = []) {
    return mails.map(({subject, id, userEmail}) => {
       return {
           ...metadata.find((meta) => {
               return subject.toLowerCase().indexOf(meta.subject.toLowerCase()) > -1;
            }),
            subject,
            emailId: id,
            userEmail
       }
    }).filter(({documentId}) => documentId)
}

module.exports = {
    processDocuments
};
