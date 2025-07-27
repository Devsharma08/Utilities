const client = require('ioredis')
const redis = new client();

async function fun(){
  try{
  console.log('============================')
  console.log('starting val');
  await redis.set("user:1" , "devsharma1");

  // await redis.set("user:1" , "devsharma2");

  const getVal = await redis.get('user:1');

  console.log(getVal);
  // console.log(val)
   console.log('============================')

  } catch(err){
    console.log(err);
  }
}

fun()