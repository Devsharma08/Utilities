const socket = io('http://localhost:5000/')
socket.on('connect',(data)=>{
  console.log(data);

  // getting message from server

  socket.on('message',(data)=>{
    console.log(data);
  })

  //client to server
  socket.emit('toserver','this is from client');

})