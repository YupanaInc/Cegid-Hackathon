
const bankStatement = require('./mock-bank-statement.js');
const mailManager = require('./MailManager.js').MailManager;
const {categoryMatched, categoryRecorded, emailAccount, emailSubject, intervalSeconds} = require('./config.js');

const {generateEmailWithAdaptiveCard} = require('./adaptive-card-email-generator');


// Schedule task - Every 30 seconds.

async function run() {
    console.log('Starting adaptive card sender');

    // Get pending bank statement lines.

    const bankEntries = bankStatement.getBankEntries();
    console.log(`* Found bank entries : ${bankEntries.length}`);

    // Get pending documents (type = purchase) from email.

    const emailsOffice = await mailManager.getEmails(emailAccount);

    // console.log(`emails - ${pendingDocumentsFromOffice.length}`);

    const pendingDocumentsFromOffice = emailsOffice.filter((currentEmail) => {
        return currentEmail.categories.includes(categoryMatched) && !currentEmail.categories.includes(categoryRecorded);
    }).map((currentEmail) => {
        return {
            emailId: currentEmail.id
        };
    });

    // console.log(`emails - ${pendingDocumentsFromOffice.length}`);

    // Get known documents from MongoDB.

    const matchCollection = await require('./category/mongodbConnect.js').getMatchersCollection();
    const matchArray = await matchCollection.find().toArray();

    // console.log(`transactions - ${matchArray}`);

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

    // console.log(`* Found documents (from emails) : ${pendingDocumentsFromOffice.length}`);

    // Schedule next step.

    const emailBody = generateEmailWithAdaptiveCard(pendingDocumentsFromOffice);

    console.log(`>> Sending email with ${pendingDocumentsFromOffice.length} transaction(s).`);

    mailManager.sendEmail(emailAccount, emailSubject, emailBody);

    // setTimeout(run, intervalSeconds * 1000);
}

run();