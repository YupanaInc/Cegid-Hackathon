
const bankStatement = require('./mock-bank-statement.js');

const intervalSeconds = 15;


// Schedule task - Every 30 seconds.

function run() {
    console.log('Start the matching.');

    // Get pending bank statement lines.

    const bankEntries = bankStatement.getBankEntries();
    console.log(`* Found bank entries : ${bankEntries.length}`);

    // TODO: get pending documents (type = invoice).

    const pendingDocumentsWithMetadata = [
        {
            emailId: 1,
            amount: 179
        },
        {
            emailId: 2,
            amount: 54.39
        }
    ];


    // TODO: match.

    const foundMatch = [];

    bankEntries.forEach((currentEntry) => {
        const matchingDocument = pendingDocumentsWithMetadata.find((currentDocument) => {
            if (foundMatch.includes((currentMatch) => {
                return currentMatch.emailId === currentDocument.emailId;
            })) {
                return false;
            }

            // TODO.

            return currentDocument.amount === currentEntry.amount;
        });

        console.log(matchingDocument ? 'YES' : 'NO')

        if (matchingDocument) {
            foundMatch.push({

            });
        }
    });

    console.log(foundMatch)


    // TODO: store result of the matching > flags on emails.


    setTimeout(run, intervalSeconds * 1000);
}

run();
