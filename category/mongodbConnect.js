const MongoClient = require('mongodb').MongoClient;
const {promisify} = require('util');
const dbName = "hackathon";
const credentials = `mongodb+srv://yupana:hackathon18@cluster0-uclsa.mongodb.net/${dbName}?retryWrites=true&w=majority`

let connectionPromise = null;

function connectToMongo() {
    if (!connectionPromise) {
        connectionPromise = promisify(MongoClient.connect)(credentials, { useNewUrlParser: true });
    }
    return connectionPromise;
}

async function getPIADocumentsCollection() {
    const connection = await connectToMongo();
    return connection.db(dbName).collection('piaDocuments');
}

async function getMatchersCollection() {
    const connection = await connectToMongo();
    return connection.db(dbName).collection('matchers');
}

module.exports = {
    connectToMongo,
    getPIADocumentsCollection,
    getMatchersCollection
}

