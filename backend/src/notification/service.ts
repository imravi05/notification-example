import admin from "#pkg/firebase";

export const sendNotificationMulticast = async (title: string, description: string, targets: string[]) => {

    try {

        const resp = await admin.messaging().sendEachForMulticast({
            notification: {
                title,
                body: description,
            },
            tokens: targets
        });

        return resp;

    } catch (error) {
        throw new Error("Failed to send notifications.");
    }

}

export const sendNotification = async (title: string, description: string, target: string) => {

    try {

        await admin.messaging().send({
            notification: {
                title,
                body: description,
            },
            token: target
        });

    } catch (error) {
        throw new Error("Failed to send notifications.");
    }

}