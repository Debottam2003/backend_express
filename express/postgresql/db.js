import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'search',
    password: 'okudera2003',
    port: 3000,
});

let { rows } = await pool.query("select * from admins limit 1");
console.log(rows);

export default pool;