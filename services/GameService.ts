import {WebSocketServer} from "ws";
import type {IgameService} from "../infrastructure/IgameService.js";

export class GameService implements IgameService
{
    constructor(private wss:WebSocketServer) {this.wss = wss;}
    CardArray(plaayer:number):Array<number>
    {
        let cardArray:Array<number> = [];
        if (cardArray.length == 0)
        {
            for (let i = 0; i < plaayer*13; i++)
            {
                cardArray.push(i);

            }
        }
        //打亂
        for (let i = cardArray.length - 1; i > 0; i--)
        {
             let index = Math.floor(Math.random() * (i + 1));
             [cardArray[i], cardArray[index]] = [cardArray[index], cardArray[i]];

        }
        console.log(cardArray);
        return cardArray;
    }
    dealCards(plaayer: number): Array<number>
    {
        return this.CardArray(plaayer);
    }
}