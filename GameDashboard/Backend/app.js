const {createServer} = require('http')

const Socket = require('socket.io')

const httpServer = createServer();

const server = new Socket.Server(httpServer,{
  cors:{
    origin:"http://localhost:5173",
  }
})

let dataFromServer = new Array();

server.on('connection',(socket)=>{
  // console.log(socket);
  socket.emit('msg','this is from backend');

  socket.on('fromClient',(data)=>{
  const finalData = {...data,'id':socket.id}
  dataFromServer.unshift(finalData);
  // console.log(dataFromServer);
  })

  socket.emit('fromServer',dataFromServer);

  setInterval(()=>socket.emit('fromServer',dataFromServer),5000);
  
})


httpServer.listen(5000,()=>{
  console.log('server is listening on port 5000');
})

