import express from 'express';

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is a custom middleware function
function customMiddleware(req, res, next) {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
}

app.get('/', customMiddleware, (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});