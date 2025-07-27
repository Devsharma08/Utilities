const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const User = require('../model/User');


passport.use(new localStrategy({usernameField:"email"} ,async(email,password,done)=>{
  try{
    const user = await User.findOne({email});
    if(!user)
      return done(null,false,{msg:"user not exists"});

    isPasswordMatch = user.comparePassword(password);
    if(!isPasswordMatch){
      return done(null,false,{msg:"password not match"});
    }
    // remove password from user 

    // const userWithoutPassword = user.toObject();
    // delete userWithoutPassword.password

    return done(null,user);
  } catch(err){
    return done(err);
  }
}))


module.exports = passport;