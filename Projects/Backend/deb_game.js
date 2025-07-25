const express = require('express');
let path = require('path');
let cors = require('cors');
let app = express();
app.use(cors());
let games = [{name: 'Tic-Tac-Toe', image: 'tictactoe.png', url: 'ttt'}, 
             {name: 'Rock-Paper-Scissors', image: 'rps.png', url: 'rps'}
            ];
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/Debottam',(req,res)=>{
 res.render('deb_game',{games: games});
});

app.get('/ttt',(req,res)=>{
    res.render('ttt');
});

app.get('/rps',(req,res)=>{
    res.render('rps');
});

app.listen(3003,()=>{
console.log('Running...');
});