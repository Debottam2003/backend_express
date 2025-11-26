import express from "./express.js";

const app = express();

console.log(app);

app.use((req, res) => {
    req.date = new Date().toLocaleString();
    console.log("first middleware called");
});

app.use((req, res) => {
    req.timeStamp = Date.now();
    console.log("second middleware called");
});

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end(`hello world ${req.date} ${req.timeStamp}`);
});

app.get("/home", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end(`hello world ${req.date} ${req.timeStamp}`);
});

app.post("/login", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end("hello world");
});

app.post("/register", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end("hello world");
});

console.log(app);

app.listen(3333, () => {
    console.log("server is listening on port", 3333);
});