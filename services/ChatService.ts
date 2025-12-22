
import {type Message } from "../Core/Enity/Message.js";
import { Server } from "socket.io";
import type {IChatService} from "../infrastructure/IChatService.js";

export class ChatService implements IChatService
{
    private messages: Message[] = [];
    constructor() {}
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
}
