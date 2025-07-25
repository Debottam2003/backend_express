const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.set('view engine','ejs');
app.use(express.static((path.join(__dirname,'public'))));

app.get("/",function(req,res){
    fs.readdir('files',function(err,files){
       //console.log(files);
       res.render('notepad',{folder: files});
    });
});
app.post("/connect",function(req,res){
    //console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.text,(err)=>{
       res.redirect('/');
    });
});
app.get('/read_data/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        //console.log(data);
        res.render("showdata",{filedata: data,filename: req.params.filename});
    })
});
app.get('/edit/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        res.render('edit',{filename: req.params.filename,filedata: data});        
    });
    
})

app.post('/newnote/edittitle/:filename',(req,res)=>{
    //console.log(req.body.newname);
    fs.rename(`./files/${req.params.filename}`,`./files/${req.body.newname}.txt`,(err)=>{ 
        res.redirect('/');
    });
});
app.post('/newnote/editnote/:filename',(req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`,`${req.body.note}`,(err)=>{
        res.redirect('/');
    })
});

app.get('/newnote/deletenote/:filename',(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        res.redirect('/')
     });
})

app.listen(3003,()=>{
    console.log("Running...");
});