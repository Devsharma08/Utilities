const express = require('express');

const User = require('./config/database')

const app = express();
const bcrypt = require('bcrypt');
// const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('./config/authentication');


// app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs'); // key value pairs and can be used within get method
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: 'keyboard cat', // secret key
  resave: false, // prevent saving unchanged session
  saveUninitialized: false, // no session creation before login
  store: MongoStore.create({
    mongoUrl:'mongodb+srv://DevSharma:IAmDev@cluster0.44z6irx.mongodb.net/PassportLocal?retryWrites=true&w=majority&appName=Cluster0',
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000*60 // 1 min
   }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{res.send('home page')})


app.get('/login',(req,res)=>res.render('login')) //render takes file name


app.get('/register',(req,res)=>res.render('register'))

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
  })
);


app.post('/register', async(req,res)=>{
  const {name,password} = req.body;
  console.log(name,password);
  
  try {
    
    if(!name || !password){
      return res.status(400).json({"error":"please enter name,password"});
    }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)
  const RegisteredUser = await User.create({name,password:hashedPassword})

  res.status(200).json({"status":"successs","user":RegisteredUser})
  } catch (error) {

  return res.status(500).json({"error":"server error","msg":error.message})

  }
})

app.get('/logout',(req,res,next)=>{
  req.logout(function(err){
    if(err) return next();
    res.redirect('/login');
  })
});

const isauthenticated = (req,res,next)=>{
  if(req.isAuthenticated()) return next();
  
  return res.redirect('/login')
}

app.get('/protected',isauthenticated,(req,res)=>{
 
  console.log("cookies: ",req.session);
  console.log("user: ",req.user);
  res.send('this is protected route');
}
)


app.listen(5000,()=>{
  console.log('listening on port 5000');
})