
const bankStatement = require('./mock-bank-statement.js');
const mailManager = require('./MailManager.js').MailManager;
const {emailAccount, intervalSeconds} = require('./config.js');



// Schedule task - Every 30 seconds.

async function run() {
    console.log('Start the matching.');

    // Get pending bank statement lines.

    const bankEntries = bankStatement.getBankEntries();
    console.log(`* Found bank entries : ${bankEntries.length}`);

    // Get pending documents (type = purchase) from email.

    const emailsOffice = await mailManager.getEmails(emailAccount);
    const pendingDocumentsFromOffice = emailsOffice.filter((currentEmail) => {
        return currentEmail.categories.includes('Purchase');
    }).map((currentEmail) => {
        return {
            emailId: currentEmail.id
        };
    });

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

    // TODO: setTag.



    setTimeout(run, intervalSeconds * 1000);
}

run();
