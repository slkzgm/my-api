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

const getDistribution = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    // Count the total number of documents in the collection
    const total = await collection.countDocuments();

    // Count the number of documents for each distinct value of 'color' and 'logo'
    const [colorCounts, logoCounts] = await Promise.all([
      collection.aggregate([{ $group: { _id: '$color', count: { $sum: 1 } } }]).toArray(),
      collection.aggregate([{ $group: { _id: '$logo', count: { $sum: 1 } } }]).toArray()
    ]);

    const colors = [];
    const logos = [];

    // Calculate the percentages for each color and logo
    colorCounts.forEach(color => {
      const percentage = (color.count / total) * 100;

      if (color._id !== 'null')
        colors.push({color: color._id, count: color.count, percentage: percentage});
    });
    logoCounts.forEach(logo => {
      const percentage = (logo.count / total) * 100;

      if (logo._id !== 'null')
        logos.push({logo: logo._id, count: logo.count, percentage});
    });
    return {
      logos,
      colors
    }
  } catch (e) {console.log(e)} finally {
    await client.close();
  }
}

const getColorDistribution = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const total = await collection.countDocuments();
    const colorCounts = await collection.aggregate([{ $group: { _id: '$color', count: { $sum: 1 } } }]).toArray();
    const colors = [];

    colorCounts.forEach(color => {
      const percentage = (color.count / total) * 100;

      if (color._id !== 'null')
        colors.push({color: color._id, count: color.count, percentage: percentage});
    });
    return colors;
  } catch (e) {console.log(e)} finally {
    await client.close();
  }
}

const getLogoDistribution = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const total = await collection.countDocuments();
    const colorCounts = await collection.aggregate([{ $group: { _id: '$logo', count: { $sum: 1 } } }]).toArray();
    const logos = [];

    colorCounts.forEach(logo => {
      const percentage = (logo.count / total) * 100;

      if (logo._id !== 'null')
        logos.push({color: logo._id, count: logo.count, percentage: percentage});
    });
    return logos;
  } catch (e) {console.log(e)} finally {
    await client.close();
  }
}


module.exports = {
  getDocuments,
  insertOrUpdateDocuments,
  getDistribution,
  getColorDistribution,
  getLogoDistribution
}
