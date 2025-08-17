import { db } from "#pkg/db";
import { ZodError } from "zod";
import type { Request, Response } from "express";
import { fromError } from 'zod-validation-error';
import { createNotificationSchema } from "./validator";
import { sendNotification, sendNotificationMulticast } from "./service";

export const sendNotificationToOne = async (req: Request, res: Response) => {
    try {

        const userId = req.params['id'] as string;
        const data = await createNotificationSchema.parseAsync(req.body);

        const user = await db.user.findUnique({ where: { id: +userId } });
        if (!user) {
            res.json({ error: "Not Found", message: "User not found" });
            return;
        }

        const notification = await db.notifications.create({
            data,
        });

        const resp = await sendNotification(data.title, data.description, user.fcmToken)
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

export const sendNotificationToAll = async (req: Request, res: Response) => {
    try {

        const data = await createNotificationSchema.parseAsync(req.body);

        const notification = await db.notifications.create({
            data,
        });

        const users = await db.user.findMany({select: {fcmToken: true}});
        const tokens = users.map(item => item.fcmToken);

        const deliveryData = await sendNotificationMulticast(data.title, data.description, tokens);
        res.json({ delivery_data: deliveryData });

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

        const notifications = await db.notifications.findMany();
        res.json({ notifications });

    } catch (error) {
        throw new Error("Internal server error.");
    }
};