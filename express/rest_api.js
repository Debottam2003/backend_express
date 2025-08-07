import express from 'express';
import pool from './postgresql/db.js'

const app = express();
const port = 3333;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// GET method route
app.get('/', async (req, res) => {
    // res.send('GET request to the homepage');
    try {
        let { rows } = await pool.query('SELECT * FROM authors');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Internal Server Error');
    }
});

// POST method route
app.post('/', (req, res) => {
    console.log('POST Body:', req.body);
    res.send(`POST request received with body: ${JSON.stringify(req.body)}`);
});

// PUT method route
app.put('/', (req, res) => {
    console.log('PUT Body:', req.body);
    res.send(`PUT request received with body: ${JSON.stringify(req.body)}`);
});

// PATCH method route
app.patch('/', (req, res) => {
    console.log('PATCH Body:', req.body);
    res.send(`PATCH request received with body: ${JSON.stringify(req.body)}`);
});

// DELETE method route
app.delete('/', (req, res) => {
    console.log('DELETE Body:', req.body);
    res.send(`DELETE request received with body: ${JSON.stringify(req.body)}`);
});

// app.get(/^\/*/, (req, res) => {
//     res.send("this is \"the\" fallback route.");
// });

app.use((req, res) => {
    res.send("this is the fallback route.");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
