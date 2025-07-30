const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://DevSharma:IAmDev@cluster0.44z6irx.mongodb.net/PassportLocal?retryWrites=true&w=majority&appName=Cluster0');

const UserSchema = mongoose.Schema({
  name:String,
  password:String,
})


module.exports = mongoose.model("UserJwt",UserSchema);