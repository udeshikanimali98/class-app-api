/// <reference path="global.d.ts" />
require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import * as routes from "./src/routes";
import { logRequest } from "./src/middleware/request-logger";
import { handleError } from "./src/middleware/error-handler";
import { Authentication } from "./src/middleware/authentication";
import databaseSetup from "./src/startup/database";
import passportStartup from "./src/startup/passport";
import cors from "cors";
import { verifyRole } from "./src/middleware/verify-role";
import { Role } from "./src/models/user-model";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as http from "http";

const production = process.env.NODE_ENV === "production";
const PORT: any = process.env.PORT || 4000;

databaseSetup();
const app = express();
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(logRequest);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

passportStartup(app);
app.use(morgan("combined"));

if (!production) {
  app.use(
    cors({
      optionsSuccessStatus: 200,
      origin: "*",
      allowedHeaders: [
        "Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With",
        "Cache-Control",
      ],
    })
  );
}

app.use("/api/auth", Authentication.verifyToken);
app.use("/api/admin", Authentication.verifyToken);
app.use("/api/admin", verifyRole(Role.SUPER_ADMIN, Role.ADMIN));

let server: http.Server;

if (production) {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.SERVER_KEY_PATH || "server.key"),
      cert: fs.readFileSync(process.env.SERVER_CERT_PATH || "server.cert"),
    },
    app
  );
} else {
  server = http.createServer(app);
}

export const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = new Server(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  },
  transports: ["polling", "websocket"]
});

io.on("connection", (socket: any) => {
  console.log("A user connected");

  if (socket) {
    io.to(socket.id).emit("new-connect", { socket_id: socket.id });
    console.log('========new connect=================')
  }

  socket.on("sendMessage", (data:any) => {
    const { recipientSocketId, message } = data;
    io.to(recipientSocketId).emit("newMessage", { message });
    console.log('========new send message emit=================')
});

  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle other socket events as needed
});

server.listen(PORT, () => {
  console.log("--> Server successfully started at port :: " + PORT)
  //AppLogger.info("--> Server successfully started at port :: " + PORT);
});

routes.initRoutes(app);
app.use(handleError);

export default app;



