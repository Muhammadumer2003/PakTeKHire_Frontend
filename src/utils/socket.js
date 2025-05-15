import {io} from "socket.io-client"



export const CreateSocketConnection=()=>{
    return io("http://51.21.200.232:8008")
    
}