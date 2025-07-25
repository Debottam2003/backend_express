import mongoose from "mongoose";
const userscema = new mongoose.Schema({
    username: String,
    age: String,
    shopping: Number,
});
let users = mongoose.model('users', userscema);

export default users;