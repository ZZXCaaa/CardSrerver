import { Socket } from "socket.io";
import type {IChatService} from "../../infrastructure/IChatService.js";


export class ChatController {

    private socket: Socket;
    private chatService: IChatService;

    constructor(socket: Socket, chatService: IChatService)
    {
        this.socket = socket;
        this.chatService = chatService;
    }

    bindEvents()
    {
        this.socket.on("getMessages", () =>
        {
            this.socket.emit("messages", this.chatService.getMessages());
        });

        this.socket.on("disconnect", () =>
        {
            console.log(`Client ${this.socket.id} left.`);
        });
    }
}
