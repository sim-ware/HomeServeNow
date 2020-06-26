const mongodb = require("mongodb");
const connectionString = "";
// Add own connectionString here

async function getDb() {
  let db;
  await mongodb.MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db(""); // Add own DB name here
  });
  return db;
}

module.exports = {
  getCollection: async (collectionName) => {
    const db = await getDb();

    return db.collection(collectionName);
  },
};
