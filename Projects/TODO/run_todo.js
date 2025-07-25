const express = require('express');`    `
require('dotenv').config();
const path = require('path');
const pg_obj = require('./pg_connect.js')
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.set('view engine', 'ejs');

app.get('/todo', (req, res) => {
    try {
        const user_id = req.cookies.user_id;
        if (user_id) {
            res.redirect('/');
        }
        else {
            res.render('register');
        }
    }
    catch (err) {
        console.error(err);
    }

});

app.get('/direct_login', (req, res) => {
    res.render('login');
});

app.post('/register', async (req, res) => {
    try {
        let email = req.body.username;
        let password = req.body.password;
        let data = await pg_obj.query("select email from users where email = $1;", [email]);
        if (data.rows.length === 0) {
            await pg_obj.query("insert into users(email, password) values($1, $2);", [email, password]);
            let { rows } = await pg_obj.query("select user_id from users where email = $1;", [email]);
            console.log(1, rows[0].user_id);
            let user_id = rows[0].user_id;
            //`/?user_id=${rows[0].user_id}`
            //const user_id = req.query.user_id;
            res.cookie('user_id', user_id, { maxAge: 60 * 60 * 1000 });
            res.render('login');
        }
        else {
            res.render('register', { error: "Email is already in use" })
        }
    }
    catch (err) {
        console.error(err);
    }
});

app.post('/login', async (req, res, next) => {
    let email = req.body.username;
    let password = req.body.password;
    let data = await pg_obj.query("select * from users where email = $1;", [email]);
    if (data.rows.length !== 0) {
        if (password === data.rows[0].password) {
            let user_id = data.rows[0].user_id;
            res.cookie('user_id', user_id, { maxAge: 60 * 60 * 1000 });
            console.log(2, data.rows[0].email);
            res.redirect('/');
        }
        else {
            res.render('login', { error: "Enter correct email and password" });
        }
    }
    else {
        res.render('login', { error: "Enter correct email and password" });
    }
});

app.get('/', async (req, res, next) => {
    try {
        const user_id = req.cookies.user_id;
        if (user_id) {
            try {
                console.log(3, user_id);
                let response = await pg_obj.query("select * from todo where user_id = $1 order by id asc;", [user_id]);
                //console.log(4, response.rows);
                if (response.rows.length > 0) {
                    res.render('index', { list: response.rows });
                }
                else {
                    res.render('index', { Empty_todo_userid: user_id });
                    console.log("empty todo for user " + user_id);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            res.redirect('/todo');
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await pg_obj.query("delete from todo where id = $1", [id]);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/add/:user_id', async (req, res, next) => {
    try {
        let job = req.body.job;
        let user_id = parseInt(req.params.user_id);
        console.log(5, job, user_id);
        await pg_obj.query("insert into todo(todo_name, user_id) values($1, $2);", [job, user_id]);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('user_id');
        res.redirect('/todo');
    }
    catch (err) {
        console.log(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(process.env.PORT, () => {
    console.log("The server is listening port: " + process.env.PORT);
});