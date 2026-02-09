import {type Message} from "../Core/Enity/Message.js";

export interface IChatService {
    saveMessage(msg: Message): Message;
    getMessages(): Message[];
}

