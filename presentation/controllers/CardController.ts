import {WebSocket, type WebSocketServer} from "ws";
import {GameService} from "../../services/GameService.js";

export class CardController
{
    constructor( private gameService:GameService,private wss:WebSocketServer) {}
    dealCards(wss:WebSocketServer):void
    {
        this.wss.clients.forEach(ws =>
        {

            ws.send(JSON.stringify({type:"card.dealCards",
                player:this.gameService.dealCards(4),
                maxSiz:13
            }));
        }
        )
    }
}
