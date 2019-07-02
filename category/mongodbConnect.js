const MongoClient = require('mongodb').MongoClient;
const {promisify} = require('util');
const dbName = "hackathon";

function connectToMongo() {
    return promisify(MongoClient.connect)(`mongodb+srv://yupana:hackathon18@cluster0-uclsa.mongodb.net/${dbName}?retryWrites=true&w=majority`)
}

async function getPIADocumentsCollection() {

    const connection = await connectToMongo();
    return await connection.db(dbName).collection('PIADocuments');
}

async function getMatchersCollection() {
    const connection = await connectToMongo();
    return await connection.collection('matchers');
}

module.exports = {
    connectToMongo,
    getPIADocumentsCollection,
    getMatchersCollection
}

