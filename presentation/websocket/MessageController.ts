import {WebSocket, type WebSocketServer} from "ws";
import { ChatService } from "../../services/ChatService.js";
import {type Message} from "../../Core/Enity/Message.js";
export class MessageController {
    constructor(private chatService: ChatService
                ,private wss:WebSocketServer) {}

    send(ws: WebSocket, payload: any) {
        try
        {
            const msg: Message = {
                from: payload.user,
                text: payload.text,
                timestamp: Date.now() // 初始值，将由 chatService 更新
            };

            const saved = this.chatService.saveMessage(msg);
            this.broadcastToAll({
                type: "chat.message",
                payload: saved
            })
            ws.send(JSON.stringify({
                type: "chat.message",
                payload: saved
            }));
        }
        catch (error)
        {
            ws.send(JSON.stringify({
                type: "error",
                payload: { message: "Failed to send message" }
            }))

        }
    }
    getMessages(ws: WebSocket) {
        const messages = this.chatService.getMessages()
        ws.send(JSON.stringify({
            type: "messages",
            payload: messages
        }))
    }

    private broadcastToAll(data: any): void {
        const message = JSON.stringify(data);

        this.wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    }