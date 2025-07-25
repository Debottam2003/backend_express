import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = 3333;

app.use(cookieParser());

app.get('/', (req, res) => {
    try {
        let cookieValue = req.cookies.myCookie;
        if (!cookieValue) {
            console.log('Cookie not found, setting a new cookie.');
            res.cookie('myCookie', 'cookieValue', { maxAge: 60 * 1000 });
            res.send('Hello, Express! A new cookie has been set.');
        } else {
            console.log('Cookie found:', cookieValue);
            res.send(`Hello, Express! Your cookie value is: ${cookieValue}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});