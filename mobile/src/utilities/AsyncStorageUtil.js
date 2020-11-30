import { AsyncStorage } from "react-native";

const TOKEN_STORAGE_KEY = "TOKEN_STORAGE_KEY_DEV";
const USER_STORAGE_KEY = "USER_STORAGE_KEY_DEV";

export default AsyncStorageUtil = {
    async saveToken(user) {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, user.accessToken);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    },

    async getAccessToken() {
        const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        return token;
    },

    async clear() {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
    },

    async validTokenExists() {
        let token = await this.getAccessToken();
        return token != null && token.length > 0 ? true : false;
    }
};
