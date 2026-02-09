//=====================Socket.IO==================================
// import { Server, Socket } from "socket.io";
//=====================Socket.IO==================================
import type {AwilixContainer} from "awilix";
import {ChatController} from "../../presentation/controllers/ChatController.js";
import { WebSocketRouter } from "../../presentation/websocket/WebSocketRouter.js"
import { WebSocketServer, WebSocket } from "ws"
import {GameService} from "../../services/GameService.js";
//=====================Socket.IO==================================
// export function registerSocketEvents(io: Server, container: AwilixContainer)
// {
//     io.on("connection", (socket: Socket) => {
//         console.log("User connected:", socket.id);
//
//         const chatService = container.resolve("chatService");
//
//         const controller = new ChatController(socket, chatService);
//         controller.bindEvents();
//
//         socket.emit("messages", chatService.getMessages());
//     });
// }
//=====================Socket.IO==================================
export function registerSocketEvents(wss: WebSocketServer, container: AwilixContainer):void
{
    console.log(`✅ WebSocket server started`);

    wss.on("connection", (ws: WebSocket) =>
    {
        console.log("🟢 Client connected");
        const heartBeat   =container.resolve("hearService");
        const chatService = container.resolve("chatService");
        const GameService = container.resolve("cardService");
        const router = new WebSocketRouter(chatService,wss,GameService);
        // 發送現有消息給新連接的客戶端
        heartBeat.initializeHeart(ws);
        ws.send(JSON.stringify({
            type: "messages",
            payload: chatService.getMessages()
        }));
        heartBeat.startHeart();
        ws.on("message", (raw) =>
        {
            try
            {
                const message = JSON.parse(raw.toString());
                router.route(ws, message,wss);
            }
            catch (error) {
                ws.send(JSON.stringify({
                    type: "error",
                    payload: { message: "Invalid JSON" }
                }));
            }
        });

        ws.on("close", () => {
            heartBeat.stopHeart();
            console.log("🔴 Client disconnected");
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

}