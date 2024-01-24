import express from "express";
import request from "supertest";
import expressFileUploud from "express-fileupload";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUploud());

app.post("/json", (req, res) => {
  const name = req.body.name;
  res.json({ hello: `Hello ${name}` });
});

app.post("/form", (req, res) => {
  const name = req.body.name;
  res.json({ hello: `Hello ${name}` });
});

app.post("/file", async (req, res) => {
  const textFile = req.files.article;
  console.info(__dirname + "/uploud/" + textFile.name);
  await textFile.mv(__dirname + "/uploud/" + textFile.name);

  res.send(`Hello ${req.body.name}, you uplouded ${textFile.name}`);
});

test("Test Request File Uploud", async () => {
  const response = await request(app)
    .post("/file")
    .set("Content-Type", "multipart/form-data")
    .field("name", "Cat")
    .attach("article", __dirname + "/contoh.txt");

  expect(response.text).toBe("Hello Cat, you uplouded contoh.txt");
});

test("Test Request JSON", async () => {
  const response = await request(app)
    .post("/json")
    .set("Content-Type", "application/json")
    .send({ name: "Cat" });

  expect(response.body).toEqual({ hello: `Hello Cat` });
});

test("Test Request Form", async () => {
  const response = await request(app)
    .post("/form")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("name=Cat");

  expect(response.body).toEqual({ hello: `Hello Cat` });
});
