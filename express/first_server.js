import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3333;

app.get('/', (req, res) => {
    // res.status(200).json({ message: "hello" });
    // res.status(200).send({ message: "hello" });
    // res.status(200).send("Hello express");
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});