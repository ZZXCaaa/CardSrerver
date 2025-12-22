import { WebSocket } from "ws";
import {MessageController} from "./MessageController.js";
import type {ChatService} from "../../services/ChatService.js";

export class WebSocketRouter
{
    private messageController: MessageController;
    constructor(chatService: ChatService) {
        this.messageController = new MessageController(chatService);
    }
    route(ws: WebSocket, message: any) {
        switch (message.type) {
            case "chat.send":
                this.messageController.send(ws, message.payload);
                break;

            default:
                ws.send(JSON.stringify({ error: "Unknown type" }));
        }
    }
}