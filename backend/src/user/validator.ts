import * as z from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters." }),
    email: z
        .string().email({ message: "A valid email is required." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    country: z
        .string()
        .min(2, { message: "Country selection is required." }),
    gender: z
        .enum(["male", "female", "other"]),
});
