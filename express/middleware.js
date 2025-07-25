import express from 'express';

const app = express();

const PORT = 3333;

// Middlware are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
// They can perform operations on the request and response objects, end the request-response cycle, or call the next middleware function in the stack.
// Middleware can be used for logging, authentication, parsing request bodies, and more.
// Middleswares can be added globally or to specific routes.
// Global middleware is applied to all routes, while route-specific middleware is applied only to specific routes.
// Before the handlers, middleware functions are executed in the order they are defined.
// All global middlewares that are defined before the route handlers will be executed for every request to the server.

// Built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is a custom middleware function
function customMiddleware(req, res, next) {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
}

app.get('/', customMiddleware, (req, res) => {
    res.send('Hello, Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});