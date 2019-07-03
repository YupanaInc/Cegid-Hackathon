
const bankStatement = require('./mock-bank-statement.js');
const mailManager = require('./MailManager.js').MailManager;
const {categoryPurchase, categoryMatched, emailAccount, intervalSeconds} = require('./config.js');


// Schedule task - Every 30 seconds.

async function run() {
    try {
        console.log('Start the matching.');

        // Get pending bank statement lines.

        const bankEntries = bankStatement.getBankEntries();
        console.log(`* Found bank entries : ${bankEntries.length}`);

        // Get pending documents (type = purchase) from email.

        const emailsOffice = await mailManager.getEmails(emailAccount);
        const pendingDocumentsFromOffice = emailsOffice.filter((currentEmail) => {
            return currentEmail.categories.includes(categoryPurchase) && !currentEmail.categories.includes(categoryMatched);
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

        // Set tags on matched documents.

        const promSetTag = pendingDocumentsFromOffice.map(async (currentDocument) => {
            console.log(`* Add tag ${categoryMatched} to email ${currentDocument.emailId}`);
            return mailManager.setTag(emailAccount, currentDocument.emailId, categoryMatched)
        });

        await Promise.all(promSetTag);
        console.log('End category process');
        process.exit(0)
    } catch (e) {
        console.log(e);
    }
}

run();
