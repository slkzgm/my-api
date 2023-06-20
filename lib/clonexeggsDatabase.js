require('dotenv').config();
const {MongoClient} = require('mongodb');

const databaseName = "rtfkt-opening";
const databaseCollectionName = "clonexeggs";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

let client;
let collection;

const init = async () => {
    client = new MongoClient(uri);
    await client.connect();
    const database = client.db(databaseName);
    collection = database.collection(databaseCollectionName);
}

const insertMany = async (tasks) => {
    try {
        await init();
        const res = await collection.insertMany(tasks);
        console.log(`${res.insertedCount} documents were inserted.`);
    } catch (err) {
        console.log(`Number of documents inserted: ${err.result.result.nInserted}`);
    } finally {
        await client.close();
    }
}

const updateClaimed = async (claimedIds) => {
    try {
        await init();
        const res = await collection.updateMany({
            _id: { $in: claimedIds }
        }, {
            $set: { claimed: true }
        });

        console.log(`${res.modifiedCount} documents updated.`);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close()
    }
}

const getUnclaimedClones = async () => {
    try {
        await init();
        const unclaimedFindResult = await collection.find({claimed: false}, {projection: {_id: 0}});

        return (await unclaimedFindResult.toArray());
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

const getLastCheckedBlock = async () => {
    try {
        await init();
        const document = await collection.findOne({ _id: 0 });

        return document ? document.lastCheckedBlock : null;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

const setLastCheckedBlock = async (blockNumber) => {
    try {
        await init();
        await collection.updateOne({
            _id: 0
        }, {
            $set: { lastCheckedBlock: blockNumber }
        });
        console.log(`Last checked block successfully updated in ${databaseCollectionName} to ${blockNumber}`);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

module.exports = {
    insertMany,
    getUnclaimedClones,
    updateClaimed,
    getLastCheckedBlock,
    setLastCheckedBlock
}