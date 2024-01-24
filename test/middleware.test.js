import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "NFR");
  next();
};

const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.redirect("/to-next-page");
});

app.get("/nfr", (req, res) => {
  res.redirect("/to-next-page");
});

app.get("/time", (req, res) => {
  res.send(`Today is: ${req.requestTime}`);
});

test("Test Response Middleware 1", async () => {
  const response = await request(app).get("/").query({ apiKey: "123" });

  expect(response.get("X-Powered-By")).toBe("NFR");
});

test("Test Response Middleware 2", async () => {
  const response = await request(app).get("/nfr").query({ apiKey: "123" });

  expect(response.get("X-Powered-By")).toBe("NFR");
});

test("Test Response Middleware Unauthorized", async () => {
  const response = await request(app).get("/nfr");

  expect(response.status).toBe(401);
});

test("Test Response Middleware Time", async () => {
  const response = await request(app).get("/time").query({ apiKey: "123" });

  expect(response.text).toContain("Today is: ");
});
