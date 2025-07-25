const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static((path.join(__dirname,'public'))));

app.get("/",async function(req,res){
    let response = await fetch('https://official-joke-api.appspot.com/random_joke')
    let data = await response.json();
    res.send(`<h1>${data.setup}</h1><p><h3>${data.punchline}<h3></p>`);
});

app.listen(3003,()=>{
    console.log("Running...");
});