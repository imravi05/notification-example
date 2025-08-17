import { Router } from "express";
import { createUser, getAllUser } from "./controller";

const router = Router();

router.get("/", getAllUser);
router.post("/", createUser);

export default router;