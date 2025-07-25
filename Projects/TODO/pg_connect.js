let {Pool} = require("pg");
require('dotenv').config();

let pg_obj = new Pool({
    user : "postgres",
    host : "localhost",
    database : "student",
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    max : 20
});

async function getdata(){
let data = await pg_obj.query("select * from todo");
console.log(data.rows);
}
getdata();

module.exports = pg_obj;