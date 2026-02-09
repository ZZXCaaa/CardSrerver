//=====================Socket.IO======================================
// import { createContainer, asClass, asValue } from "awilix";
// import { Server } from "socket.io";
// import {ChatService} from "../services/ChatService.js";
//====================================================================
import { createContainer, asClass, asValue } from "awilix";
import { WebSocketServer } from "ws"
import {ChatService} from "../services/ChatService.js";
import {HeartService} from "../services/HeartService.js";
import {GameService} from "../services/GameService.js";

//=====================Socket.IO======================================
// export function bulideContainer(wss:)
// {
//     const container = createContainer();
//
//     container.register({
//         io: asValue(io),
//         chatService: asClass(ChatService).singleton()
//     });
//     return container;
// }
//====================================================================
export function bulideContainer(wss:WebSocketServer)
{
    const container = createContainer();
    container.register({
        wss: asValue(wss),
        chatService: asClass(ChatService).singleton(),
        hearService: asValue(new HeartService(wss)),
        cardService: asClass(GameService).singleton()

    })

    return container;
}