import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

// Middleware
// app.use(cors()); // enable CORS for all origins (customize options if needed)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // allow credentials
    next();
});

app.use(express.json()); // parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.get('/api/data', (req, res) => {
    res.send('Hello from Express JS');
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});