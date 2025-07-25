let mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/debtube");
let schema = new mongoose.Schema({
    title: String,
    video: String
});
module.exports = mongoose.model('videos',schema);