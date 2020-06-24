const jobRepository = require("./repositories/jobRepository");
const tradespersonRepository = require("./repositories/tradespersonRepository");
const express = require("express");
const app = express();

app.use(express.json());
app.listen(3000, function () {
  console.log("listening on 3000");
});

// c R E A T E j O B
// // // // // // //
app.post("/jobs", async (req, res) => {
  await jobRepository.createJob(req.body);
  res.json(req.body);
});

// c R E A T E t R A D E S P E R S O N
// // // // // // // // // // // // //
app.post("/tradespeople", async (req, res) => {
  await tradespersonRepository.createTradesperson(req.body);
  res.json(req.body);
});
