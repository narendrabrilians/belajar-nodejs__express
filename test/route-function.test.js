import express from "express";
import request from "supertest";

const app = express();

app
  .route("/products")
  .get((req, res) => {
    res.send("Get Product");
  })
  .post((req, res) => {
    res.send("Create Product");
  })
  .put((req, res) => {
    res.send("Update Product");
  })
  .delete((req, res) => {
    res.send("Delete Product");
  });

test("Test Route Path", async () => {
  let response = await request(app).get("/products");
  expect(response.text).toBe("Get Product");

  response = await request(app).post("/products");
  expect(response.text).toBe("Create Product");

  response = await request(app).put("/products");
  expect(response.text).toBe("Update Product");

  response = await request(app).delete("/products");
  expect(response.text).toBe("Delete Product");
});
