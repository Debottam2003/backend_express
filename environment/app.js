import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

console.log(process.env); // All the environemt variables are added to the proces.env object
// export PORT=3333

const PORT = process.env.PORT;
console.log(PORT);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});