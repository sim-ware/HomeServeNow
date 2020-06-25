const mongoClient = require("./mongoClient");
var ObjectId = require("mongodb").ObjectID;

module.exports = {
  getAll: async (collectionName) => {
    const collection = await mongoClient.getCollection(collectionName);
    const result = await collection.find({}).toArray();

    return result;
  },

  getOne: async (collectionName, id) => {
    const collection = await mongoClient.getCollection(collectionName);
    const documentById = await collection.findOne({ _id: new ObjectId(id) });

    return documentById;
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
