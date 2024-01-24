import express from "express";
import request from "supertest";

const app = express();

app.use(express.static(__dirname + "/static"));
// app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send("Hello Response!");
});

test("Test Static File", async () => {
  const response = await request(app).get("/");

  expect(response.text).toBe("Hello Response!");
});

test("Test Static File static-file.txt", async () => {
  const response = await request(app).get("/static-file.txt");

  expect(response.text).toBe("Hello World!");
});
