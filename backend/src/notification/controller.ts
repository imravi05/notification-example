import { db } from "#pkg/db";
import { ZodError } from "zod";
import type { Request, Response } from "express";
import { fromError } from 'zod-validation-error';
import { createNotificationSchema } from "./validator";
import { getIO } from "./socket";

export const sendNotification = async (req: Request, res: Response) => {
    try {

        const data = await createNotificationSchema.parseAsync(req.body);
        const notification = await db.notifications.create({ data });
        const io = getIO();
        io.emit("newNotification", notification);
        res.json({ message: "Notification send successfully. " });

    } catch (error) {
        if (error instanceof ZodError) {
            res.json({
                error: "Invalid data",
                message: fromError(error)
            })
                .status(422);
        }
        throw new Error("Internal server error.");
    }
};


export const getAllNotifications = async (req: Request, res: Response) => {
    try {

        const notifications = await db.notifications.findMany({
            orderBy: {id: "desc"}
        });
        res.json({ notifications });

    } catch (error) {
        throw new Error("Internal server error.");
    }
};


export const markAsRead = async (req: Request, res: Response) => {
    try {

        const id = req.params['id'] as string;
        const notification = await db.notifications.update({
            where: { id: +id },
            data: { read: true }
        });
        res.json({ notification });

    } catch (error) {
        throw new Error("Internal server error.");
    }
};