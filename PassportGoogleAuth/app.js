const express = require('express')
const passport = require('./modal/authenticate')
const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo');
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:1000*60*1 // 1 min
   },
   store:MongoStore.create({
    mongoUrl:"mongodb+srv://DevSharma:IAmDev@cluster0.44z6irx.mongodb.net/Passport-Google?retryWrites=true&w=majority&appName=Cluster0",
    collectionName:"Passport-Google"

   })
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res)=>{
  res.send('this is home page..')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/callback', // link we given at google developer website while setting this up  
  passport.authenticate('google', { failureRedirect: '/login' , successRedirect:'/protected'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


const authenticated = (req,res,next) =>{
  if(req.isAuthenticated()) return next();
  else{
    res.status(401).send("unauthenticated user");
  }
}
app.get('/protected',authenticated,(req,res)=>{

  res.render('protected');
})

app.listen(5000,()=>{

  console.log('server is listening on port 5000');
})