const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('form',{username: null,userage: null});
});

app.post('/userdata',(req,res)=>{
    console.log(req.body);
    res.render('userdata',{username: req.body.username,userage: req.body.userage});
});

app.listen(3003);