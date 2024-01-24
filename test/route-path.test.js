import express from "express";
import request from "supertest";

const app = express();

app.get("/product/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test Route Path", async () => {
  let response = await request(app).get("/product/nfr.json");
  expect(response.text).toBe("/product/nfr.json");

  response = await request(app).get("/categories/123.json");
  expect(response.text).toBe("/categories/123.json");

  response = await request(app).get("/categories/salah.json");
  expect(response.status).toBe(404);
});
