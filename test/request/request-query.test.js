import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstAnimal} & ${req.query.secondAnimal}!`);
});

test("Test Query Parameter", async () => {
  const response = await request(app)
    .get("/")
    .query({ firstAnimal: "Cat", secondAnimal: "Bird" });

  expect(response.text).toBe("Hello Cat & Bird!");
});
