const mongoClient = require("./mongoClient");

module.exports = {
  getAll: async (collectionName) => {
    const collection = await mongoClient.getCollection(collectionName);
    const result = await collection.find({}).toArray();

    return result;
  },

  createOne: async (collectionName, details) => {
    const collection = await mongoClient.getCollection(collectionName);
    collection
      .insertOne(details)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  },
};
