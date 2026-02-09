//===================socket.IO==============================
// import { Socket } from "socket.io";
//===================socket.IO==============================
import {WebSocket} from "ws";
import type {IChatService} from "../../infrastructure/IChatService.js";

//===================socket.IO==============================
// export class ChatController {
//
//     private socket: Socket;
//     private chatService: IChatService;
//
//     constructor(socket: Socket, chatService: IChatService)
//     {
//         this.socket = socket;
//         this.chatService = chatService;
//     }
//
//     bindEvents()
//     {
//         this.socket.on("getMessages", () =>
//         {
//             this.socket.emit("messages", this.chatService.getMessages());
//         });
//
//         this.socket.on("disconnect", () =>
//         {
//             console.log(`Client ${this.socket.id} left.`);
//         });
//     }
// }
//===================socket.IO==============================
export class ChatController
{
    private ws:WebSocket;
    private ChatService:IChatService;
    constructor(ws:WebSocket,ChatService:IChatService)
    {
        this.ws=ws;
        this.ChatService=ChatService;
    }
    bindEvents():void
    {
        this.sendWelcomeMessage();
    }
    sendWelcomeMessage():void
    {
        this.ws.send(JSON.stringify({type:"welcome",payload:{message:"Welcome to the chat!"}}));
    }
    handleDisconnect(): void {
        console.log("客戶端已斷線");
    }
}