require('dotenv').config();
const express = require('express');
const app = express();

const passport = require('./utils/authentication');
const connectDB = require('./connect/connectDB');
const userRouter = require('./router/userRouter');
const { compareToken } = require('./utils/jwtToken');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
const LoginAuthenticate = passport.authenticate('local',{session:false})

app.post('/login',LoginAuthenticate,async (req,res)=>{
  // const {name,_id,createdAt} = req.user
  const newUser = req.user;
  res.json({ message: 'Login successful', user:req.user });
})

app.get('/jwt',compareToken,(req,res)=>{
  res.send({"msg":'hello after the verification',"userInfo":req.user});
})
app.use('/api/v1/auth', userRouter);

app.get('/', (req, res) => {
  res.send('This is home page');
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB:', err);
  }
};

start();
