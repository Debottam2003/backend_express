let mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/debtube");
let schema = mongoose.Schema({
    title: String,
    video: String
});
let dbmodel = mongoose.model('videos',schema);
module.exports = dbmodel;