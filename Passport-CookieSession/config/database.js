require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL);

const UserSchema = mongoose.Schema({
  name: String,
  password:String,
})


module.exports = mongoose.model('User',UserSchema);

