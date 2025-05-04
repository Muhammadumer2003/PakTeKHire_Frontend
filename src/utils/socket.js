import {io} from "socket.io-client"



export const CreateSocketConnection=()=>{
    return io("http://localhost:8008")
    
}