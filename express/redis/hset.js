import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

await redisClient.hSet("user:100", {
  name: "John Doe",
  email: "john.doe@example.com",
  age: "30",
});

let userData = await redisClient.hGetAll("user:100");
console.log(userData);

await redisClient.quit();
