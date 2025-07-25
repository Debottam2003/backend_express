const { Pool } = require('pg');
const pg_obj = new Pool({
    user: 'postgres',
    host: 'localhost',             
    database: 'student',      
    password: 'okudera2003',  
    port: 3000,                    
});
// pool.query(`CREATE TABLE members (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100),
//     message TEXT
// );`);
module.exports = pg_obj;