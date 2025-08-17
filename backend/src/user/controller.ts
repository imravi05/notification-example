import { db } from "#pkg/db";
import { ZodError } from "zod";
import { createUserSchema } from "./validator";
import type { Request, Response } from "express";
import { fromError } from 'zod-validation-error';

export const createUser = async (req: Request, res: Response) => {
    try {

        const data = await createUserSchema.parseAsync(req.body);

        const user = await db.user.create({
            data,
        });

        res.json({ user });

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

export const getAllUser = async (req: Request, res: Response) => {
    try {

        const users = await db.user.findMany({
            orderBy: { id: "desc" }
        });
        res.json({ users });

    } catch (error) {
        throw new Error("Internal server error.");
    }
};