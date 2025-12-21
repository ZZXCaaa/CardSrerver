import { Server, Socket } from "socket.io";
import type {AwilixContainer} from "awilix";
import {ChatController} from "../../presentation/controllers/ChatController.js";

export function registerSocketEvents(io: Server, container: AwilixContainer)
{
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        const chatService = container.resolve("chatService");

        const controller = new ChatController(socket, chatService);
        controller.bindEvents();

        socket.emit("messages", chatService.getMessages());
    });
}
