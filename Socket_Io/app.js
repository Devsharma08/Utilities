const {createServer} = require('http')

const {Server} = require('socket.io')

const httpServer = createServer();
const socket = new Server(httpServer,{
  cors:{
    origin:"*",
  }
})



socket.on('connection',(socket)=>{
  // console.log("Socket is: ",socket);

  //server to client

  socket.emit('message','this is data from server to client');

  //client form server

  socket.on('toserver',(data)=>{
    console.log(data);
    
  })


})

httpServer.listen(5000,()=>{
  console.log('server is listening on port 5000');
  
})