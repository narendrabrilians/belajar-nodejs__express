import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/cookie", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
  // res.send(`Hello ${req.cookies.name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/cookie")
    .set("Cookie", "name=Cat;color=blue");

  expect(response.text).toBe("Hello Cat");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Lion" });

  expect(response.text).toBe("Hello Lion");
  expect(response.get("Set-Cookie").toString()).toContain("Lion");
});
