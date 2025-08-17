import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { markNotificationAsRead } from "./service";

let io: SocketIOServer | null = null;

export const initSocket = (server: HTTPServer): SocketIOServer => {
    io = new SocketIOServer(server, {
        connectTimeout: 100000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("Client connected:", socket.id);

        socket.on("markAsRead", async (payload: { notifications: number | number[] }) => {
            try {
                const notifications = Array.isArray(payload.notifications)
                    ? payload.notifications
                    : [payload.notifications];

                for (const id of notifications) {
                    await markNotificationAsRead(id);
                    console.log(`Notification marked as read: ${id}`);
                }

                socket.emit("notificationRead", { success: true, data: notifications });
            } catch (err) {
                console.log(err)
                console.error("Error marking notification as read:", err);
                socket.emit("notificationRead", { success: false, error: err });
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    setInterval(() => {
        io?.emit("heartbeat", { time: new Date().toISOString() });
    }, 5000);

    return io;
};

export const getIO = (): SocketIOServer => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};
