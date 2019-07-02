
const bankStatement = require('./mock-bank-statement.js');

const intervalSeconds = 15;


// Schedule task - Every 30 seconds.

async function run() {
    console.log('Start the matching.');

    // Get pending bank statement lines.

    const bankEntries = bankStatement.getBankEntries();
    console.log(`* Found bank entries : ${bankEntries.length}`);

    // TODO: get pending documents (type = invoice) from email.

    const pendingDocumentsFromOffice = [
        {
            emailId: '5f82996b-b71d-4db9-a68d-e630d6bc18e2'
        },
        {
            emailId: '1f316a89-9d88-45fa-988a-da5e17d7d8e7'
        }
    ];

    // Get known documents from MongoDB.

    const matchCollection = await require('./category/mongodbConnect.js').getMatchersCollection();
    const matchArray = await matchCollection.find().toArray();

    pendingDocumentsFromOffice.forEach((currentEmail) => {
        const foundMatch = matchArray.find((currentMatch) => {
            return currentMatch.emailId === currentEmail.emailId;
        })

        if (foundMatch) {
            currentEmail.date = foundMatch.date;
            currentEmail.label = foundMatch.label;
            currentEmail.amount = foundMatch.amount;
        }
    });


    console.log(pendingDocumentsFromOffice)


    console.log(`* Found documents (from emails) : ${pendingDocumentsFromOffice.length}`);

    // Simple matching (1 to 1) between documents and bank entries.

    const foundMatch = [];

    bankEntries.forEach((currentEntry) => {
        const matchingDocument = pendingDocumentsFromOffice.find((currentDocument) => {
            if (foundMatch.includes((currentMatch) => {
                return currentMatch.emailId === currentDocument.emailId;
            })) {
                return false;
            }

            return currentDocument.amount === currentEntry.amount;
        });

        if (matchingDocument) {
            foundMatch.push({
                emailId: matchingDocument.emailId,
                transactionId: currentEntry.transactionId
            });
        }
    });

    console.log(`* Found matching bank entries : ${foundMatch.length}`);

    // TODO: store result of the matching > flags on emails.

    console.log(foundMatch)



    setTimeout(run, intervalSeconds * 1000);
}

run();
