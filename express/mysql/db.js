import pool from 'mysql2/promise';
const cla = process.argv;
console.log(cla);
console.log(cla.slice(2));

// const msPool = pool.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'debottam',
//     connectionLimit: 100,
// });

const msPool = pool.createPool(
    'mysql://root:debottam@localhost:4000/mydb',
    {
        connectionLimit: 100
    }
);

let [data] = await msPool.query("select * from users;");
console.log(data);

export default msPool;
