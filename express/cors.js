import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// Enable CORS for all routes
// cors middleware allows cross-origin requests 
// cross origin resource sharing is a mechanism that allows restricted resources 
// on a web page to be requested from another domain outside the domain.

app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Adjust the origin as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Only allow requests from http://localhost:4000 and http://localhost:3333 as this is the port where the server is running
// it is same origin so allow requests from the same origin

const PORT = 3333;

app.get('/', (req, res) => {
    if (req.cookies.testCookie) {
        console.log('Cookie found:', req.cookies.testCookie);
    } else {
        console.log('No cookie found');
    }
    res.cookie('testCookie', 'cookieValue', {
        httpOnly: true, // Cookie is not accessible via JavaScript
        secure: true, // Set to true if using HTTPS
        sameSite: 'None', // Cookie is sent only for same-site requests
        maxAge: 60 * 1000, // 1 min
    });
    res.status(200);
    res.send('Hello, Express!');
});

app.get('/render', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});