import pool from 'mysql2/promise';

const msPool = pool.createPool({
    host: 'localhost',
    user: 'root',
    password: 'okudera2003',
    database: 'deb',
    connectionLimit: 100,
});

let [data] = await msPool.query("select * from user limit 1");
console.log(data);

export default msPool;