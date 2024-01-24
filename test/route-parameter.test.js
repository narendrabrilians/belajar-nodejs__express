import express from "express";
import request from "supertest";

const app = express();

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  res.send(productId);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const categoryId = req.params.id;
  res.send(categoryId);
});

test("Test Route Path", async () => {
  let response = await request(app).get("/product/nfr");
  expect(response.text).toBe("nfr");

  response = await request(app).get("/categories/123");
  expect(response.text).toBe("123");

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);
});
