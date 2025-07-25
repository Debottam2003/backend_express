const express = require('express');
const app = express();

app.get('/profile/:username',function(req,res,next){
       res.send(`welcome ${req.params.username}`);
});

app.get('/profile/:username/:age',function(req,res,next){
    res.send(`welcome ${req.params.username} of age ${req.params.age}`);
});

app.listen(3003,()=>{
    console.log("Running");
})
