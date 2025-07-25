import express from 'express';

const app = express();

const PORT = 3333;

app.get('/', (req, res) => {
    res.json('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});