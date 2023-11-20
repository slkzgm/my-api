require('dotenv').config()
const {MongoClient} = require('mongodb');

const databaseName = "rtfkt-forging";
const databaseCollectionName = "dunk";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

const addToForgedSupply = async (toAdd) => {
    const client = new MongoClient(uri);
    const database = client.db(databaseName);
    const collection = database.collection(databaseCollectionName);

    try {
        await collection.updateOne({_id: 0}, {
            $inc: {
                og: parseInt(toAdd.og),
                x: parseInt(toAdd.x),
                v: parseInt(toAdd.v)
            }
        });
        console.log(`DATABASE: forged supply successfully incremented by ${JSON.stringify(toAdd)}.`);
    } catch (e) {
        console.log(e)
    } finally {
        await client.close();
    }
}

const getForgedSupply = async () => {
    const client = new MongoClient(uri);
    const database = client.db(databaseName);
    const collection = database.collection(databaseCollectionName);

    try {
        return await collection.findOne({_id: 0}, {projection: {_id: 0}});
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
};

const setForgedSupply = async (forged) => {
    const client = new MongoClient(uri);
    const database = client.db(databaseName);
    const collection = database.collection(databaseCollectionName);

    try {
        await collection.updateOne({_id: 0}, {
            $set: {
                og: parseInt(forged.og),
                x: parseInt(forged.x),
                v: parseInt(forged.v),
                ghost: parseInt(forged.ghost)
            }
        });
        console.log(`DATABASE: forged supply successfully updated to ${JSON.stringify(forged)}.`);
    } catch (e) {
        console.log(e)
    } finally {
        await client.close();
    }
};

module.exports = {
    addToForgedSupply,
    getForgedSupply,
    setForgedSupply
}