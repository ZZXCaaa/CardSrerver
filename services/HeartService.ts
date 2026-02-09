import {WebSocketServer,WebSocket} from "ws";
import type {PingMessage} from "../Core/Enity/E_Heart.js";

export class HeartService
{
    private wss:WebSocketServer;
    private heartbeatInterval: NodeJS.Timeout|null = null;
    private readonly PING_INTERVAL = 3000;
    private readonly HEARTBEAT_TIMEOUT = 3500;

    constructor( wss:WebSocketServer) {this.wss = wss;}

    //創建ping方 法
    private creatPingMessage():PingMessage
    {
        return {
            type:"ping",
            timestamp:Date.now()
        }
    }
    //初始化心跳機制
    initializeHeart(ws:WebSocket &{isAlife?:boolean,heartBeatTime?:NodeJS.Timeout }):void
    {
        ws.isAlife = true;

        ws.on("pong",()=>
        {
            ws.isAlife = true;
            console.log("💓 Received pong from client");
        })

    }
    //啟動心跳機制
    public startHeart():void
    {
        //setInterval (()=>{執行內容},每隔幾豪秒)
        this.heartbeatInterval = setInterval(()=>
        {
            this.wss.clients.forEach((ws:WebSocket&{isAlife?:boolean})=>
            {
                if(!ws.isAlife)
                {
                    console.log("❌ Terminating inactive client");
                    return ws.terminate();
                }
                ws.isAlife = false;
                if (ws.readyState==ws.OPEN)
                {
                    ws.ping();
                }
            });
            //顯示在線人數
            console.log(` Heartbeat check - Active connections:${this.wss.clients.size}`);
        },this.PING_INTERVAL);
    }
    //停止心跳
    public stopHeart ():void
    {
        if(this.heartbeatInterval)
        {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = null;
        }
    }
    private getConnectionStats(): {total:number,alive:number}
    {
        let activeCount = 0;
        this.wss.clients.forEach((ws:WebSocket&{isAlife?:boolean})=>
        {
            if(ws.isAlife && ws.readyState==ws.OPEN)
            {
                activeCount++;
            }
        });

        return {
            total:this.wss.clients.size,
            alive:activeCount
        };
    }
}