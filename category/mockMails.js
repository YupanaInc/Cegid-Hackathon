const receivedMails = [
    {
        userMail: "dupont@devlooplondon.onmicrosoft.com",
        emailId: "5f82996b-b71d-4db9-a68d-e630d6bc18e2",
        attachment: [1, 2, 3]
    }, 
    {
        userMail: "dupont@devlooplondon.onmicrosoft.com",
        emailId: "8f816a89-9d88-45fa-988a-da5e17d7d8e8",
        attachment: []
    },
    {
        userMail: "dupont@devlooplondon.onmicrosoft.com",
        emailId: "1f316a89-9d88-45fa-988a-da5e17d7d8e7",
        attachment: [1, 2, 3]
    }
];


async function fetchMails() {
    return receivedMails;
}


async function updateTags() {
    return true;
}

module.exports = {
    fetchMails,
    updateTags
}