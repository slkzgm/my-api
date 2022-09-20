require('dotenv').config()
const {MongoClient} = require('mongodb');

const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = "rtfkt-forging";
const databaseCollectionName = "mint";
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

const insertMany = async (tasks) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const res = await collection.insertMany(tasks);
    console.log(`${res.insertedCount} documents were inserted.`);
  } catch (err) {
    console.log(`Number of documents inserted: ${err.result.result.nInserted}`);
  } finally {
    await client.close();
  }
}

const updateSupply = async (_id, minted) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    await collection.updateOne({_id}, {$set: {minted}});
    console.log(`DATABASE: ${_id} supply successfully updated to ${minted}.`);
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
};

const getGeneralSupply = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const supplyFindResult = await collection.find({}, {projection: {_id: 0, name: 1, minted: 1, maxSupply: 1}});

    return await supplyFindResult.toArray();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports = {
  insertMany,
  updateSupply,
  getGeneralSupply
}
