import { useState } from 'react'
import { io } from 'socket.io-client';
import './App.css'
import Input from './components/input/input';
import { useEffect } from 'react';

const socket = io('http://localhost:5000/')
function App() {
  const [data,setData] = useState('')
  const [finalData,setFinalData] = useState([])

  function connectSocket(){

    socket.on('connect',(data)=>{
  })

    socket.on('msg',(data1)=>{
      console.log(data1);
    })

    socket.on('fromServer',(dataFromServer)=>{
      // console.log(dataFromServer);
      setFinalData(dataFromServer);
    })

  }

  function handleInput(event){
    let prevObj = {[event.target.name]:event.target.value} 
    setData((prevObj)=>({...prevObj,[event.target.name]:event.target.value}));
    
    // console.log({...prevObj,[event.target.name]:event.target.value})
    
  }

  function sendScore(){
    if(socket.emit('fromClient',data))
      alert('send succesfully');
    setData({});
  }

  useEffect(()=>{
    connectSocket();

  },[])

  return (
    <>
    <div>
      <p className='heading'> Game Score Dashboard Using Socket</p>
      <Input placeholder="Enter the Name" name="name" handleInput={handleInput} />
      <br />
      <Input placeholder="Enter the Score" name="score" handleInput={handleInput}/>
      <div>
        <button type='button' className='btn' onClick={sendScore}>Send Score</button>
      </div>
    </div>
    <div>
      <table className="table">
        <thead className='tableh'>
          <tr className='tabler'>
            <th className='tabled'>Name</th>
            <th className='tabled'>Score</th>
            <th className='tabled'>User ID</th>
          </tr>
        </thead>
        <tbody className='tableb'>
        {
        finalData.map((ele, index) => (
          <tr key={index} className='tabler'>
            <td className='tabled'>{ele?.name}</td>
            <td className='tabled'>{ele?.score}</td>
            <td className='tabled'>{ele?.id}</td>
          </tr>
        ))
        }     
        </tbody>
      </table>
    </div>
    </>
  )
}
export default App;
