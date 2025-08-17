import { CustomNotification, User } from 'types/custom';
import { SERVER_URL } from '../constants';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const client = axios.create({ baseURL: SERVER_URL });

const saveUserData = async (data: Omit<User, "id">) => {
    try {
        data.gender = data.gender.toLowerCase();
        await client.post("/users", data);
        Toast.show({
            type: "success",
            text1: "User created successfully",
        });
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Failed to save data.",
            text2: "try again."
        });
    }
}

const getAllUsers = async () => {
    try {
        const resp = await client.get("/users");
        const respData = resp.data.users as User[];
        return respData;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Failed to get users.",
            text2: "try again."
        });
        return [] as User[];
    }
}

const getAllNotifications = async () => {
    try {
        const resp = await client.get("/notifications");
        const respData = resp.data.notifications as CustomNotification[];
        return respData;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Failed to get users.",
            text2: "try again."
        });
        return [] as CustomNotification[];
    }
}

export default {
    saveUserData,
    getAllUsers,
    getAllNotifications,
}