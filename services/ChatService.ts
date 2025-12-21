
import {type Message } from "../Core/Enity/Message.js";
import { Server } from "socket.io";
import type {IChatService} from "../infrastructure/IChatService.js";

export class ChatService implements IChatService
{
    private messages: Message[] = [];
    private io: Server;

    constructor(io: Server)
    {
        this.io = io;
    }

    saveMessage(msg: Message): Message
    {
        msg.timestamp = Date.now();
        this.messages.push(msg);
        return msg;
    }

    getMessages(): Message[]
    {
        return this.messages;
    }

    broadcast(event: string, data: any): void
    {
        this.io.emit(event, data);
    }
}
