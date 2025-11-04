import pkg from 'pg';

const { Pool } = pkg;

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'search',
//     password: 'okudera2003',
//     port: 3000,
//     max: 100
// });

const pool = new Pool({
    connectionString: "postgresql://postgres:okudera2003@localhost:3000/search",
    max: 100,
});

let { rows } = await pool.query("select * from admins limit 1");
console.log(rows);

export default pool;