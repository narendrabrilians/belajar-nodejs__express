import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error: ${err.message}`);
};

app.get("/", (req, res) => {
  throw new Error("Error!");
});

app.use(errorMiddleware);

test("Test ExpressJS", async () => {
  const response = await request(app).get("/");

  console.info(`Status: ${response.status}`);
  console.info(`Text: ${response.text}`);
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: Error!");
});
