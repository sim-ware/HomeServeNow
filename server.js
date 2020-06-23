const express = require("express");
const app = express();

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// E X T R A C T &&  // // // // // // // // // // // // // // // // // // // // // // // //
// R E T U R N : 'db'// // // // // // // // // // // // // // // // // // // // // // // //
let db;
let jobsCollection;
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://yoda:skywalker@cluster0-xja5e.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("Connected to Database");
    db = client.db("star-wars-quotes");
    jobsCollection = db.collection("jobs");
  }
);
console.log("db", db);
console.log("jobsCollection", jobsCollection);
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.use(express.json());

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.post("/jobs", (req, res) => {
  console.log("req.body", req.body);
  //
  // // jobsRepository.createJob(req.body);
  jobsCollection
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
  // //
  //
  res.json(req.body);
});
