const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be less than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) next()
  try{
  const genSalt = await bcrypt.genSalt();
  const HashedPassword = await bcrypt.hash(this.password,genSalt);
  this.password = HashedPassword
  console.log("hashed Password: ",HashedPassword);
  next();
  } catch(err){
    next(err.message);
  }
  
})

userSchema.methods.comparePassword = async function (password) {
  try{
    const isMatch = await bcrypt.compare(password,this.password);
    console.log("is Pswd Match: ",isMatch);
  
  return isMatch;
  } catch(err){
    throw err.message
  }
  
}

module.exports = mongoose.model('User', userSchema);
