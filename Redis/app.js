const express = require('express')
const axios = require('axios');
const app = express();
const redis = require('ioredis')
const client = new redis();


app.use(express.json())

app.get('/',async(req,res)=>{

  try {
      const redisData = await client.get('todos');
      if(redisData){
      const redisDataToObject = JSON.parse(redisData);

      return res.status(200).json({"count":redisDataToObject.length,"users":redisDataToObject})
      }
      const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
      res.status(200).json({"count":data.data.length,"users":data.data})
      await client.set('todos',JSON.stringify(data.data));
      await client.expire('todos',30);
  } catch (error) {
      throw error
  }

})


app.listen(5000,()=>{
  console.log('server is listenning on port 5000');
})