import AsyncStarage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";

export async function setTokenApi(token) {
    try {
        await AsyncStarage.setItem(TOKEN, token);
        return true;
    } catch (error) {
        return null;
    }

}

export async function getTokenApi () {
    try {
        const token = await AsyncStarage.getItem(TOKEN);
        return token;
    } catch (error) {
        return null;
    }
}

export async function removeTokenApi() {
    try {
        await AsyncStarage.removeItem(TOKEN);
        return true;
    } catch (error) {
        return null;
    }
}