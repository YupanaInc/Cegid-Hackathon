
const MongoClient = require('mongodb').MongoClient;
const {promisify} = require('util');

const dbName = "hackathon";
const user = "yupana";
const password = "hackathon18";
const domain = "cluster0-uclsa.mongodb.net";

const credentials = `mongodb+srv://${user}:${password}@${domain}/${dbName}?retryWrites=true&w=majority`

let connectionPromise = null;

function connectToMongo() {
    if (!connectionPromise) {
        connectionPromise = promisify(MongoClient.connect)(credentials, {useNewUrlParser: true});
    }
    return connectionPromise;
}

async function getMatchersCollection() {
    const connection = await connectToMongo();
    return connection.db(dbName).collection('matchers');
}

module.exports = {
    connectToMongo,
    getMatchersCollection
}
