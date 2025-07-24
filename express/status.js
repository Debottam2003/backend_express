import express from 'express';

const app = express();

const PORT = 3333;

// 404, 400, 200, 201, 500

app.get('/', (req, res) => {
    res.status(200).send('Hello, Express!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});