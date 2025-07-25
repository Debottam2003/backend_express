const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let pg = require("./pg_connect");
const app = express();

// EJS and Static File Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res, err) => {
    //console.log(err);
    res.render('index', { title: 'My Website' });
    let person = "sri";
    let data = await pg.query("select * from members where name = $1;",[person]);
    console.log(data.rows);
    if(data.rows.length == 0){
        console.log("no data");
    }
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pg.query(
            'INSERT INTO members (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        res.send('Message sent successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving message');
    }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
