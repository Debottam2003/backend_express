import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;
console.log(`Database url: ${process.env.DATABASE_URL}`);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});