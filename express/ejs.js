import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3333;


app.set('view engine', 'ejs');
// app.set('views', './views'); // implicitly set to 'views' directory though

app.get('/', (req, res) => {
    // res.send('Hello, Express!');
    res.render('index', { title: 'Welcome to Express with EJS' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});