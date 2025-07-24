import express from 'express';

const app = express();

const PORT = 3333;

app.get('/:email', (req, res) => {
    // Access the email parameter from the request
    try {
        const email = req.params.email;
        console.log(email);
        res.send('Hello, Express!');
    } catch (error) {
        console.error('Error accessing email parameter:', error);
        res.status(500).send('Internal Server Error');
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});