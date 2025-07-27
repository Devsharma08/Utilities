
const mongoose = require('mongoose')

const connectDB = async(url) =>{
  await mongoose.connect(url)
  console.log('Connnected to DataBase');
  
}

module.exports = connectDB;