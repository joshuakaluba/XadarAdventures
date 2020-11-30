import StorageKeysEnums from './../enums/StorageKeysEnums';

const TokenUtility = {
    saveToken(token) {
        localStorage.setItem(StorageKeysEnums.JWT_TOKEN, JSON.stringify(token));
    },

    getToken() {
        const token = localStorage.getItem(StorageKeysEnums.JWT_TOKEN);
        return JSON.parse(token).accessToken;
    },

    isLoggedIn() {
        const token = localStorage.getItem(StorageKeysEnums.JWT_TOKEN) || null;
        return !!JSON.parse(token) && JSON.parse(token).accessToken ?
            JSON.parse(token).accessToken.length > 0 : false;
    },

    logOut() {
        localStorage.clear();
    }
};

export default TokenUtility;
