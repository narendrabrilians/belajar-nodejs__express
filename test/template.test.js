import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", mustacheExpress());

app.get("/", (req, res) => {
  res.render("index.html", {
    title: "NFR",
    say: "Hello World!",
  });
});

test("Test Template", async () => {
  const response = await request(app).get("/");
  console.info(response.text);

  expect(response.text).toContain("NFR");
  expect(response.text).toContain("Hello World!");
});
