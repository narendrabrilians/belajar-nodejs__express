import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/nfr", (req, res) => {
  res.send("Hello NFR!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
