const mongodb = require("mongodb");
const connectionString =
  "mongodb+srv://yoda:skywalker@cluster0-xja5e.mongodb.net/test?retryWrites=true&w=majority"; // ENV_VAR

async function getDb() {
  let db;
  await mongodb.MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db("star-wars-quotes"); // CHANGE_DB_NAME
  });
  return db;
}

module.exports = {
  getCollection: async (collectionName) => {
    const db = await getDb();

    return db.collection(collectionName);
  },
};
