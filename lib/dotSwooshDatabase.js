require('dotenv').config()
const {MongoClient} = require("mongodb");

const databaseName = "SWOOSH";
const databaseCollectionName = "dotSwoosh";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

const getDocuments = async (filter) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  if (!filter)
    filter = {};
  try {
    const supplyFindResult = await collection.find(filter, {projection: {_id: 0}});

    return (await supplyFindResult.toArray())
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

const insertOrUpdateDocuments = async documents => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const updateOperations = documents.map(doc => ({
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: doc },
        upsert: true
      }
    }));
    const result = await collection.bulkWrite(updateOperations);
    console.log(`${result.result.nUpserted} documents inserted, and ${result.result.nModified} updated.`);
  } finally {
    await client.close();
  }
}

module.exports = {
  getDocuments,
  insertOrUpdateDocuments
}
