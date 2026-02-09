import { WebSocketServer } from "ws";
import {WebSocketRouter} from "./WebSocketRouter.js";
import {ChatService} from "../../services/ChatService.js";


export function startWebSocketServer(port: number) {
    const wss = new WebSocketServer({ port });
    let router: WebSocketRouter;
    const chatService = new ChatService();
    router = new WebSocketRouter(chatService,wss);

    console.log(`✅ WebSocket running on ws://localhost:${port}`);

    wss.on("connection", (ws) => {
        console.log("🟢 Unity connected");

        ws.on("message", (raw) => {
            try {
                const message = JSON.parse(raw.toString());
                router.route(ws, message);
            } catch {
                ws.send(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    });
}