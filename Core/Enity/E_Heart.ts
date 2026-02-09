export interface BaseWebSocketMessage
{
    type:string;
    timestamp:number;
}
export interface PingMessage extends BaseWebSocketMessage
{
    type:"ping";
}
export interface PongMessage extends BaseWebSocketMessage
{
    type:"pong";
}
export type WebSocketMessage = PingMessage | PongMessage;