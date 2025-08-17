import * as z from "zod";

export const createNotificationSchema = z.object({
    title: z.string().min(3).describe("Title is required."),
    description: z.string().min(6).describe("Description Token is required."),
});