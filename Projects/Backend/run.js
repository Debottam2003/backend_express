const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static((path.join(__dirname,'public'))));

app.get("/",function(req,res){
    //res.send("All Ok.");
    res.render('index1');
});

app.listen(3003,()=>{
    console.log("Running...");
});