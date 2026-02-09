import {WebSocket, type WebSocketServer} from "ws";
import {MessageController} from "./MessageController.js";
import type {ChatService} from "../../services/ChatService.js";
import {CardController} from "../controllers/CardController.js";
import {GameService} from "../../services/GameService.js";

export class WebSocketRouter
{
    private messageController: MessageController;
    private cardController:CardController;
    constructor(chatService: ChatService , wws:WebSocketServer,gameService:GameService) {
        this.messageController = new MessageController(chatService,wws);
        this.cardController = new CardController(gameService,wws);
    }
    route(ws: WebSocket, message: any ,wws:WebSocketServer) {
        switch (message.type) {
            case "chat.send":
                this.messageController.send(ws, message.payload);
                break;
            case "chat.getMessages":
                this.messageController.getMessages(ws)
                break
            case "chat.DealingCards":
                    this.cardController.dealCards(wws);
                    console.log(wws.clients.size)
                break;
            case "chat.EndDealingCards":
                break;
            default:
                ws.send(JSON.stringify({
                    type: "error",
                    payload: {message: "Unknown message type"}

                }))
        }
    }
}