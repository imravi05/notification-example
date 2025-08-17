import { Router } from "express";
import { getAllNotifications, sendNotificationToAll, sendNotificationToOne } from "./controller";

const router = Router();

router.get("/", getAllNotifications);
router.post("/", sendNotificationToAll);
router.post("/:id", sendNotificationToOne);

export default router;