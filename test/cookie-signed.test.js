import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("SECRET"));
app.use(express.json());

app.get("/cookie", (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/cookie")
    .set(
      "Cookie",
      "Login=s%3ALion.kQUuR7TzJUX8DuKRDKtA3l%2BGxk4YZzdrD3rKkUG2J%2B4; Path=/"
    );
  console.info(response.text);

  expect(response.text).toBe("Hello Lion");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Lion" });

  console.info(response.get("Set-Cookie").toString());
  expect(response.text).toBe("Hello Lion");
  expect(response.get("Set-Cookie").toString()).toContain("Lion");
});
