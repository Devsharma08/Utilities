const http = require('http');

const httpServer = http.createServer()
const socket = require('socket.io')

const userArr = [];
const io = new socket.Server(httpServer,{
  cors:{
    origin:'*',
  }
})

io.on('connection',(data)=>{

  console.log("Socket user id: ",data.id);

  data.on('toServer',(userData)=>{
    userArr.unshift(userData) 
    return io.emit('toClient', userArr)
  })


data.on('delete',(id)=>{
  let index = userArr.findIndex((data)=>data.id === id);
  if(index !== -1){
    userArr.splice(index,1);
    io.emit('toClient', userArr);
  }
});



  data.on('edit',(formData)=>{
    console.log('on edit in backend');
    
    console.log(formData);
    
    let currentIndex = userArr.findIndex((data)=>data.id === formData.id)

    if(currentIndex !== -1){
      console.log('index matched');
      
      userArr[currentIndex] = {...userArr[currentIndex],...formData}
      io.emit('toClient', userArr);
    }
  })
});

setInterval(()=>io.emit('toClient', userArr),5000)

httpServer.listen(5000,()=>{
  console.log('server is listening on port 5000');
})