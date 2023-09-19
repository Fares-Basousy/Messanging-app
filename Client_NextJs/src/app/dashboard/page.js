"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const [rooms,setRooms] = useState([])
  const [messages,setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentRoom,setCurrentRoom] = useState()
  const [showModal, setShowModal] = useState(false);
  const [newRoom,SetNewRoom] = useState('')
  const [responseMessage,setResponseMessage] = useState('')
  const router = useRouter()
  const  name = useRef()
  const  id = useRef(Cookies.get('userId'))
  const  socket = useRef();
  useEffect(() => {
    
    name.current = Cookies.get('name')
    // Create a socket connection
    socket.current = io('http://localhost:5000',{query: {'id':id.current }},)

    socket.current.on('connect', function() {
        console.log('Connected');
    });
    socket.current.on('initialize', (data) => {
      if(rooms.length == 0){
      setRooms(data.rooms)}
  
    })

    // Listen for incoming messages
    socket.current.on('sendmsg', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
       setRooms((prevRooms) => (
          prevRooms.map((room) => {
            if(room.id == message.room){          
          room.messages.push(message)}
          return room}))
        )})


    socket.current.on('openchat', (room) => {
        setMessages(room.messages);
        setCurrentRoom(room)
       
    });

    return () => {
        socket.current.disconnect();
    };
},[rooms]);

const sendMessage = () => {
    socket.current.emit('sendmsg',{
      text: currentMessage,
      sender:name.current,
      room:currentRoom._id});
    // Clear the currentMessage state
    setCurrentMessage('');
};

const openChat = (roomId)=>{
  socket.current.emit('openchat',{
    _id:roomId});
  // Clear the currentMessage state
  setCurrentMessage('');

}

const  addRoom = async  () =>{
  const data = {user1: id.current,user2:newRoom}
    await fetch("../api/createroom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const response  = await res.json() //to read readable stream
    
    if (response.status == 200 || response.status == 201)
    {
    window.location.reload();
    }
    else {
    setResponseMessage(response.message);           
    setMessage(response.message);}
    })
  .catch((error) => {
    console.log(error)
  });
}
  return (<>
<div className="flex flex-row h-full w-full overflow-x-hidden justify-around  overscroll-auto">
  <div className= "py-10 h-screen bg-gray-3 px-2 w-72">
    <div className= "max-w-md h-full mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg container flex flex-col ">
      <div className="bg-gray-700 rounded-l flex items-center ">
          <Image  src="./../icon.svg" sizes="any" width= {100} height= {100}/>
          <div className="text-2xl font-extrabold">{name.current}</div>
      </div>
        <div className= "md:flex">
            <div className= "w-full p-4 overflow-hidden container">
                <ul>
                  {rooms.length==0?null:rooms.map((room) => (
                    <li className= "flex justify-between border rounded-xl  items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition" onClick={()=>openChat(room._id)} key={room._id}>
                        <div className= "flex ml-2">
                            <div className="flex flex-col ml-2"> <span className= "font-medium text-black">{room.names[0] == name.current?room.names[1]:room.names[0]}
                              </span> <span className= "text-sm text-gray-400 truncate w-32">{room.messages.length==0?null:room.messages[room.messages.length-1].text}</span> </div>
                        </div>
                    </li>))} 
                                       
                </ul>
                </div>
            </div>
            <div className="mt-auto">
              <button className="mt-auto w-full text-white bg-gray-700 rounded-l font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150" type="button"  onClick={() => setShowModal(true)}
      >
        Create Chat 
      </button>
      <button className="mt-auto w-full text-white bg-red-700 rounded-l font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150" type="button"  onClick={() => {
        Cookies.remove('name', { path: '' })
        Cookies.remove('userId', { path: '' })
        Cookies.remove('access_token', { path: '' })
        router.push('/')}
        }
        
      >
        Logout 
      </button>
      </div>
        </div>
    </div>
    <div className="flex flex-col flex-auto h-full min-h-screen p-6 ">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 ">
        <div className="flex flex-col  mb-4 justify-between " style={{ minHeight : '90vh'}}>
          <div className="flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb-y-0 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96 lg:supports-scrollbars:pr-2 lg:max-h-96"  style={{ minHeight : '85vh'}}>
            <div className="grid gap-y-2">
            {messages.map((message) => (
                <div  className={"relative ml-3 text-sm  py-2 px-4 shadow rounded-xl max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl " + (message.sender==name.current?' bg-gray-900 text-white col-start-6 col-end-13 ':'bg-white text-gray-800 col-start-1 col-end-8')}>
                  <p className="text-base md:text-lg lg:text-xl xl:text-2xl whitespace-normal break-all ">{message.text}</p>
                </div>
            ))}
            
            </div>
          </div>
          <div className="flex flex-row items-center  h-16 rounded-xl bg-white w-full max px-4  mt-3 ">
            
            
          <div className="flex-grow ml-4 mt-auto m-auto">
              <div className="relative w-full">
                <input type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 text-gray-800 pl-4 h-10" placeholder="Message" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
              </div>
            </div>
            
              <button className=" ml-4 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={sendMessage}>
                <span>Send</span>
                
              </button>
                      
          </div>  


        </div>
        
      </div>
    </div>
</div>
{showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Create Chat
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                  <form className="relative p-6 flex-auto transition-all bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2  flex flex-col text-left " onSubmit={addRoom} >
                  <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                      <label className="block mb-2 font-bold text-gray-600">
                        UserName:
                        <br />
                          <input
                          required
                          className="border border-gray-300 shadow p-3 w-full rounded mb-"
                          type="text"
                          placeholder="Type..."
                          name="newRoom"
                          value={newRoom}
                          onChange={(event) => {
                            const  value  = event.target.value;
                            SetNewRoom(value);}}
                          />    
                      </label>
                    </div>          
                  </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <p className="mb-4  font-extrabold leading-none tracking-tight text-red-600   text-center "  >
                  {responseMessage}
                </p>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={async () => {
                      const res = await addRoom(newRoom)
                    }}
                  >
                    Add Room
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

</>
  );
}





  



      
