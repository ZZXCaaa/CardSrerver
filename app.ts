// 导入 reflect-metadata，用于支持装饰器和依赖注入
import "reflect-metadata"
// 导入 express 框架，用于创建 Web 服务器
import express from "express"
// 导入 Node.js 内置的 http 模块，用于创建 HTTP 服务器
import http from "http"
// 从 socket.io 导入 Server 类，用于实现 WebSocket 功能
import { WebSocketServer } from "ws";
import {bulideContainer} from "./di/container.js";
import {registerSocketEvents} from "./infrastructure/socket/socket.setup.js";

//socketIO==============================================================
//import {Server} from "socket.io";
//import {registerSocketEvents} from "./infrastructure/socket/socket.setup.js";
//===================================================================================

//---------------------------socketIO------------------------------------------------------
// // 创建 Express 应用实例
// const app = express();
//
// // 使用 Express 应用创建 HTTP 服务器
// // 这样做是为了让 Express 和 Socket.IO 共享同一个 HTTP 服务器
// const server = http.createServer(app);
//
// // 创建 Socket.IO 服务器实例
// // 参数1: 传入 HTTP 服务器实例
// // 参数2: 配置选项
// // 允许所有来源的跨域请求，在生产环境中应该设置具体的域名
// const io = new Server(server, {cors: {origin: "*"  }});
//
// const container = bulideContainer(io);
// registerSocketEvents(io, container);
//
// const PORT = 3000;
// server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
//-----------------------------------------------------------------------------------------

// 创建 Express 应用实例
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server,path:"/ws"});

const container = bulideContainer(wss);
registerSocketEvents(wss, container);

const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));


