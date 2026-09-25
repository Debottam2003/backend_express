import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

console.log(process.env); // All the environemt variables are added to the proces.env object
// export PORT=3333

const PORT = Number(process.env.PORT) || 3333;
console.log(PORT);

const app = express();

app.use(express.json());

console.log(process.env.DB_URL);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});