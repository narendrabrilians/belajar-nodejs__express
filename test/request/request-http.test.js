import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}!`);
});

test("Test ExpressJS", async () => {
  const response = await request(app).get("/").query({ name: "NFR" });

  expect(response.text).toBe("Hello NFR!");
});
