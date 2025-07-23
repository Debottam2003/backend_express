import mongoose from 'mongoose';

await mongoose.connect("mongodb://127.0.0.1:27017/amazon");

let userSchema = new mongoose.Schema({
    username: String,
    age: String,
    shopping: Number
});

let userModel = mongoose.model('users', userSchema);

let data = await userModel.find().sort({ shopping: 1 }).limit(3);

console.log(data);

export default userModel;