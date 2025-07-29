import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [formData, setFormData] = useState({});
  const [userList, setUserList] = useState([]);
  const [isEdit,setIsEdit] = useState(false);

  function socketConnection() {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Optional: receive updated list from server
    socket.on("toClient", (data) => {
      setUserList(data);
    });
  }

  function handleInput(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function setEditData(data){
    setFormData(data);
    setIsEdit(true);
    console.log(data);
    
  }

  function handleEdit(){
   socket.emit('edit',formData);
   setFormData({});
   setIsEdit(false)
  }


  function handleDelete(data){
    const {id} = data
    socket.emit('delete',id);
  }

  function handleSubmit() {
    const addId = {...formData,id:uuidv4()}
    console.log(addId);
    
    socket.emit("toServer", addId);
    
    setFormData({});
  }

  useEffect(() => {
    socketConnection();
  }, []);

  return (
    <div>
      <h1>CRUD With Socket.IO</h1>
      <div className="container">
        <input
          type="text"
          className="inp"
          onChange={handleInput}
          value={formData.name || ""}
          placeholder="Enter the Name"
          name="name"
        />
        <input
          type="text"
          onChange={handleInput}
          className="inp"
          value={formData.age || ""}
          placeholder="Enter the Age"
          name="age"
        />
        <input
          type="text"
          onChange={handleInput}
          className="inp"
          value={formData.phone || ""}
          placeholder="Enter the Phone no."
          name="phone"
        />
      </div>

      <div>
        <button onClick={isEdit ? handleEdit :handleSubmit} className="btn">
         { isEdit ? " Change Data" : "Submit Data"}
        </button>
      </div>

      <div>
        <h2>User Records</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.phone}</td>
                <td>{data.id}</td>
                <td>
                    <button type="button" data-id={index} onClick={()=>setEditData(data)}> Edit</button>
                </td>
                <td>
                    <button type="button" onClick={()=>handleDelete(data)}>Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
