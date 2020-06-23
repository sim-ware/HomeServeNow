const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.post("/jobs", (req, res) => {
  console.log("req.body", req.body);
  res.json({ requestBody: req.body });
});
