import { db } from "#pkg/db";

export const markNotificationAsRead = async (id: number) => {
    try {
        await db.notifications.update({
            where: { id },
            data: { read: true }
        });
    } catch (error) {
        console.log(error)
        throw new Error("Failed to mark as read.");
    }
}