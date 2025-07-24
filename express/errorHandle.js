import express from 'express';

const app = express();

const PORT = 3333;

app.get('/', (req, res, next) => {
    try {
        res.send('Hello, Express!');
    } catch (error) {
        // next(error);
        throw new Error('Something went wrong!');
    }
});

//  This is the error handling middleware
//  When ever an error is thrown in the route handlers, it will be caught here
// or if next(error) is called all other middlewares and routes will be skipped
// and a handler with method signature (err, req, res, next) will be called 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});