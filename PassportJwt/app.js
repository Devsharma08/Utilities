const express = require('express');
const passport = require('./modal/authentication');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express();
app.use(express.json())
const UserJwt = require('./modal/UserModel')

app.get('/',(req,res)=>{
  res.send('this is home page')
})


app.post('/register',async (req,res)=>{
  const {name,password} = req.body;
  if(!name || !password) return res.status(401).json({"msg":"enter name and password"});

  let user = await UserJwt.findOne({name});
  if(user){
     return res.status(401).json({"msg":"user already exists"});
  } else {
    let hashedPassword = bcrypt.hashSync(password,10);
    user = new UserJwt({name,"password":hashedPassword})
    await user.save()
    return res.status(201).json({
  status: "success",
  user: {
    id: user._id,
    name: user.name
  }
})
  }
})


app.post('/login',async (req,res)=>{
  const {name,password} = req.body;
  if(!name || !password) return res.status(401).json({"msg":"enter name and password"});

  let user = await UserJwt.findOne({name});
  if(!user){
     return res.status(401).json({"msg":"user not exists,please singup first"});
  } else {
    if(!bcrypt.compare(password,user.password)){
      return res.status(400).json({"msg":"wrong password entered"})
    }
    let payload = {
      name:user.name,
      id:user._id,
    }
    const token = jwt.sign(payload,'secret',{"expiresIn":"1d"})

    return res.status(201).json({
  status: "success",
  user: {
    id: user._id,
    name: user.name,
    "token":"Bearer "+token,
  }
})
  }
})

app.get('/protected',passport.authenticate('jwt',{session:false}),(req,res)=>{

  res.json({"user":req.user})
})


app.listen(5000,()=>{
  console.log('server is listening on port 5000...');
})