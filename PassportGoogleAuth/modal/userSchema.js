const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://DevSharma:IAmDev@cluster0.44z6irx.mongodb.net/Passport-Google?retryWrites=true&w=majority&appName=Cluster0');

const UserSchema = mongoose.Schema({
  name:String,
  googleId:String,
})

module.exports = mongoose.model('User',UserSchema);