import { WebSocket } from "ws";
import { ChatService } from "../../services/ChatService.js";
import {type Message} from "../../Core/Enity/Message.js";
export class MessageController {
    constructor(private chatService: ChatService) {}

    send(ws: WebSocket, payload: any) {
        // 创建一个符合 Message 接口的对象
        const msg: Message = {
            from: payload.user,
            text: payload.text,
            timestamp: 0  // 初始值，将由 chatService 更新
        };

        const saved = this.chatService.saveMessage(msg);

        ws.send(JSON.stringify({
            type: "chat.message",
            payload: saved
        }));
    }
}