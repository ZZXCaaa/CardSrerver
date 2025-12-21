import { createContainer, asClass, asValue } from "awilix";
import { Server } from "socket.io";
import {ChatService} from "../services/ChatService.js";


export function bulideContainer(io: Server)
{
    const container = createContainer();

    container.register({
        io: asValue(io),
        chatService: asClass(ChatService).singleton()
    });
    return container;
}