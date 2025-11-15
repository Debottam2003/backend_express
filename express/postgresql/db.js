import pkg from 'pg';
import express from "express";

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

let { rows } = await pool.query("select * from papers offset 0 limit 10;");
console.log(rows);

export default pool;

let app = express();
app.use(express.json());

app.get("/data/:start/:end", async (req, res) => {
    let { start, end } = req.params;
    console.log(start, end);
    start = Number(start);
    end = Number(end);
    if (end < start) {
        [end, start] = [start, end];
    }
    console.log(start, end);
    let { rows } = await pool.query("select * from papers offset $1 limit $2", [start, end - start]);
    if (rows.length === 0) {
        return res.status(400).json({ message: "No data to show" });
    }
    res.json(rows);
});

app.listen(3333, () => {
    console.log("Server is listening on http://localhost:3333");
});
