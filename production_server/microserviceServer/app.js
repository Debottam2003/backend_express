import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/userroutes.js'
// import ejs from 'ejs';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase';
// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

app.use(cors());
app.set('view engine', 'ejs');

app.use('/api', router);

async function dbconnect() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DataBase connected.");
        app.listen(PORT, () => {
            console.log("The server is running on port:", PORT);
        });
    }
    catch(err){
        console.log(err);
    }
}

dbconnect();