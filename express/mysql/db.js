import pool from 'mysql2/promise';

// const msPool = pool.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'debottam',
//     connectionLimit: 100,
// });

const msPool = pool.createPool(
    'mysql://root:@localhost:3306/debottam',
    {
        connectionLimit: 100
    }
);

let [data] = await msPool.query("select * from users;");
console.log(data);

export default msPool;