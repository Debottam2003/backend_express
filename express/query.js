import express from 'express';

const app = express();

const PORT = 3333;

// http://localhost:3333/?name=debottam%20kar&age=22
// This will log the query parameters to the console
// req.query = { name: 'debottam kar', age: '22' }
app.get('/', (req, res) => {
    console.log(req.query);
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});