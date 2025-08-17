import * as z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3).describe("Name is required."),
    fcmToken: z.string().min(6).describe("FCM Token is required."),
});