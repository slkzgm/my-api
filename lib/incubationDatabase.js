require('dotenv').config()
const {MongoClient} = require("mongodb");

const databaseName = "rtfkt-incubation";
const databaseCollectionName = "eggs";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

const getIncubationDetails = async (eggId) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const database = client.db(databaseName);
    const collection = database.collection(databaseCollectionName);
    try {
        await client.connect();
        return await collection.findOne({tokenId: eggId}, {projection: {_id: 0}});
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
};

module.exports = {
    getIncubationDetails
}