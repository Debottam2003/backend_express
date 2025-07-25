import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

// Define the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply to all requests
app.use(limiter);

// On specific routes, you can apply the limiter as well
app.use('/api/', limiter);

// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3333, () => console.log('Server running on port 3000'));


// // Custom rate limiter logic
// const max = 100; // Maximum requests
// now = Date.now();
// const windowMs = 15 * 60 * 1000; // 15 minutes
// count = 0;
// if (now < firstRequestTime + windowMs) {
//     // Still within the window, increment count
//     if (count >= max) {
//         // Limit exceeded
//         res.status(429).send('Too many requests, please try again later.');
//         return;
//     }
//     count++;
// } else {
//     // Window expired, reset
//     count = 1;
//     firstRequestTime = now;
// }

// Completely custom role based rate limiting middleware
const windowMs = 15 * 60 * 1000; // 15 minutes
const rateLimits = {
    guest: 50,
    user: 100,
    admin: 1000,
};

// In-memory store: { key: { count, firstRequestTime } }
const rateMap = {};

// middleware to assign roles
app.use((req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        req.user = { id: 'guest', role: 'guest' }; // default guest role
    } else {
        // Simulate user retrieval from token
        // In a real application, you would verify the token and retrieve using jwt or database check or both
        // together
        req.user = { id: 'user123', role: 'user' }; // can be get from token
    }
    next();
});

// Role-based rate limiting middleware
app.use((req, res, next) => {
    const now = Date.now();
    const { id, role } = req.user;
    const limit = rateLimits[role] || rateLimits['guest'];
    const key = `${id}:${role}`; // unique key per user-role pair

    if (!rateMap[key]) {
        rateMap[key] = {
            count: 1,
            firstRequestTime: now,
        };
        return next();
    }

    const data = rateMap[key];

    if (now < data.firstRequestTime + windowMs) {
        if (data.count >= limit) {
            return res.status(429).send(`Too many requests for role: ${role}`);
        }
        data.count++;
    } else {
        data.count = 1;
        data.firstRequestTime = now;
    }

    next();
});

app.get('/', (req, res) => {
    res.send(`Hello ${req.user.role}, request accepted!`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


