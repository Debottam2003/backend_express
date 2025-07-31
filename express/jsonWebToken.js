import jwt from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

let secretKey = "This is a secret key";

let token = jwt.sign({ data: 'example' }, secretKey, { expiresIn: '1h' });
console.log("Generated Token:", token);

let decodedToken = jwt.verify(token, secretKey);
console.log("Decoded Token:", decodedToken);

function verifier(req, res, next) {
    try {
        let token = req.cookies.token;
        let decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;
        next();
    } catch (err) {
        next(err);
    }
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/login", (req, res) => {
    let token = jwt.sign({ data: 'example' }, secretKey, { expiresIn: '1h' });
    console.log("Generated Token:", token);
    res.cookie("token", token);
    res.status(200).send("Logged in");
});

app.get("/profile", verifier, (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user);
});

app.use((req, res) => {
    console.log("404 error");
    res.status(404).send("404 Not found");
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("Internal server error");
});

app.listen(3333, () => {
    console.log("Server is listening and running on port : 3333");
});
