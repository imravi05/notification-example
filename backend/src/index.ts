import { CONFIG } from "./config";

// Express
import cors from "cors";
import express, { json } from "express";

// Socket
import http from "http";
import { initSocket } from "./notification/socket";

// Routers
import userRouter from "./user/router";
import notificationRouter from "./notification/router";

const app = express();

app.use(json());
app.use(cors({origin: "*", methods: ["GET", "POST", "PUT", "DELETE"]}));

const server = http.createServer(app);

// Socket.IO
initSocket(server);

app.use("/users", userRouter);
app.use("/notifications", notificationRouter);

server.listen(CONFIG.PORT, () => {
  console.log(`Server active on http://localhost:${CONFIG.PORT}`);
});
