const {MongoClient} = require('mongodb');

const dbUser = "slkappz";
const dbPassword = "wmWEc09ag9r4fwaC";
const databaseName = "rtfkt-forging";
const databaseCollectionName = "mint";


const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;
const nameEquivalent = [
  null,
  'CLONE X Genesis T-Shirt 🧬',
  'CLONE X Genesis Hoodie 🧬',
  'CLONE X Genesis Cap 🧬',
  'CLONE X Genesis Socks 🧬'
]

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

const updateSupply = async (_id, supply) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    await collection.updateOne({_id}, {$set: {supply}});
    console.log(`DATABASE: ${_id} supply successfully updated to ${supply}.`);
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
    const supplyFindResult = await collection.find();

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
