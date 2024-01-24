import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "NFR",
    "X-Author": "Narendra F.R",
  });
  res.send("Hello Response!");
});

test("Test Response Header", async () => {
  const response = await request(app).get("/");

  expect(response.text).toBe("Hello Response!");
  expect(response.get("X-Powered-By")).toBe("NFR");
  expect(response.get("X-Author")).toBe("Narendra F.R");
});
