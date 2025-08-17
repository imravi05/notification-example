import { Router } from "express";
import { getAllNotifications, markAsRead, sendNotification } from "./controller";

const router = Router();

router.get("/", getAllNotifications);
router.post("/", sendNotification);
router.post("/:id", markAsRead);

export default router;