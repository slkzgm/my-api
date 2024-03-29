require('dotenv').config()
const {MongoClient} = require("mongodb");

const databaseName = "rtfkt-opening";
const databaseCollectionName = "clones";
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

const insertOne = async (task) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const res = await collection.insertOne(task);
    console.log(`Document successfully inserted with id: ${res.insertedId}.`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const updateFloorPrice = async (dna, floorPrice) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    await collection.updateOne({dna}, {$set: {floorPrice}});
    console.log(`DATABASE: ${dna} floorPrice successfully updated to ${floorPrice}Ξ.`);
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
};

const addVial = async (dna, qty, savedAtBlock) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    await collection.updateOne({dna}, {$inc: {supply: qty}, $set: {savedAtBlock}});
    console.log(`DATABASE: ${dna} incremented successfully by ${qty}.`);
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
};

const getCollectionsFloorPrices = async (filter) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection('collections');

  if (!filter)
    filter = {};
  try {
    const supplyFindResult = await collection.find(filter, {projection: {name: 1, floorPrice: 1, _id: 0}});

    return (await supplyFindResult.toArray())
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

const getSupply = async (filter) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  if (!filter)
    filter = {};
  try {
    const supplyFindResult = await collection.find(filter, {projection: {dna: 1, supply: 1, _id: 0}});

    return (await supplyFindResult.toArray())
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

const getFloorPrice = async (filter) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  if (!filter)
    filter = {};
  try {
    const supplyFindResult = await collection.find(filter, {projection: {dna: 1, floorPrice: 1, _id: 0}});

    return (await supplyFindResult.toArray())
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

const retrieveTotalSupply = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const supplyFindResult = await collection.find({});
    let fullSupply = 0;

    (await supplyFindResult.toArray())
      .forEach(dna => fullSupply += dna.supply);

    return fullSupply;
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

const lastSavedBlock = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    let lastSavedBlock = 0;
    const blocks = await collection.find({},{projection: {savedAtBlock: 1, _id: 0}});

    (await blocks.toArray())
      .forEach(document => {
        if (document.savedAtBlock > lastSavedBlock)
          lastSavedBlock = document.savedAtBlock;
      });

    return lastSavedBlock;
  } catch (err) {
    console.log(err)
  } finally {
    await client.close();
  }
};

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

const getBoxFloorPrice = async (filter) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection('collections');

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

const updateCollectionsFloorPrices = async (name, floorPrice) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection('collections');

  try {
    await collection.updateOne({name}, {$set: {floorPrice}});
    console.log(`DATABASE: ${name} floorPrice successfully updated to ${floorPrice}Ξ.`);
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
};

module.exports = {
  addVial,
  getCollectionsFloorPrices,
  getDocuments,
  getBoxFloorPrice,
  getFloorPrice,
  getSupply,
  insertMany,
  insertOne,
  updateCollectionsFloorPrices,
  updateFloorPrice,
  lastSavedBlock,
  retrieveTotalSupply
}
