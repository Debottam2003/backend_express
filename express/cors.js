import express from 'express';
import cors from 'cors';

const app = express();
// Enable CORS for all routes
// cors middleware allows cross-origin requests 
// cross origin resource sharing is a mechanism that allows restricted resources 
// on a web page to be requested from another domain outside the domain.

app.use(cors({
    origin: 'http://localhost:4000', // Adjust the origin as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

// Only allow requests from http://localhost:4000 and http://localhost:3333 as this is the port where the server is running
// it is same origin so allow requests from the same origin

const PORT = 3333;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});