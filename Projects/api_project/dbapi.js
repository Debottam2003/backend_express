// db setup(code) --- deb formation(mongo db)
// model(code) --- collection(mongo db)
// schema(code) --- document(mongo db)
let mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/dbapi");
let  apischema = mongoose.Schema({
     country: String,
     capital: String
});
const api = mongoose.model('api',apischema);
module.exports = api;