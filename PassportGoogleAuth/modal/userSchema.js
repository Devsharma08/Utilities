const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);

const UserSchema = mongoose.Schema({
  name:String,
  googleId:String,
})

module.exports = mongoose.model('User',UserSchema);