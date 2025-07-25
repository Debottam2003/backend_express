let express = require('express');
let app = express();
let api = require('./dbapi.js');
let cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/:country', async (req,res)=>{
    const country = req.params.country;
    let apidata = await api.findOne({"country": country.toUpperCase()},{_id: false});
    console.log(apidata);
    res.json(apidata);
    //res.send(apidata);
});

app.listen(3003,(err)=>{
    console.log("Running...");
});