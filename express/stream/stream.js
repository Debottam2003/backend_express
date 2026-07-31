import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/file", (req, res) => {
  // res.send(`Hello from Express`);
  // res.setHeader('Content-Disposition', 'attachment; filename="index.html"');
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/download/file", (req, res) => {
  // res.send(`Hello from Express`);
  res.download(path.join(__dirname, "index.html"), "custom_name.html");
});

app.get("/file2", (req, res) => {
  // res.send(`Hello from Express`);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Disposition", 'attachment; filename="index.html"');
  // res.setHeader('Content-Disposition', 'inline; filename="index.html"');
  //inline shows in browser, attachment forces download
  let dataBuffer = fs.readFileSync(path.join(__dirname, "index.html"));
  res.send(dataBuffer);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
