import okudera from "./express.js";

const app = okudera();

// console.log(app);

app.use(okudera.json());

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
    let { username, password } = req.body;
    console.log("username:", username);
    console.log("password:", password);
    console.log("request body:", req.body);
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