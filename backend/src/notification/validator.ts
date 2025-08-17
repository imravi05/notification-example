import z from "zod";

export const createNotificationSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters." }),
    description: z
        .string()
        .min(6, { message: "Description must be at least 6 characters." }),
    type: z.enum(["form", "normal"]),
});
