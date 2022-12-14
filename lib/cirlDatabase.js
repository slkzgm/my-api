require('dotenv').config()
const {MongoClient} = require("mongodb");

const databaseName = "rtfkt-opening";
const databaseCollectionName = "cirl-beta";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;

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

const getLastSavedId = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);
  try {
    return (await collection.find({},{projection: {_id: 0}}).sort({_id: -1}).limit(1).toArray())[0];
  } catch (e) {console.log(e);} finally {
    await client.close();
  }
}

const getUsSize = async (usSize, cw, onlyHubbed = false) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);
  try {
    const options = {
      us: usSize
    }
    if (cw)
      options['cw'] = cw;
    if (onlyHubbed === true) {
      options['hubbed'] = true;
    }
    return await collection.find(options, {projection: {_id: 0}}).toArray();
  } catch (e) {console.log(e);} finally {
    await client.close();
  }
}

module.exports = {
  insertMany,
  getLastSavedId,
  getUsSize
}
