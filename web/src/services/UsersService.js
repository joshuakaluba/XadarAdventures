
import Config from '../Config';
import TokenUtility from '../utilities/TokenUtility';

const UsersService = {

    async logIn(credentials) {
        const url = `${Config.apiUrl}/Authentication/Login`;

        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(
                json.message ? json.message : 'Unable to log in'
            );
        }

        TokenUtility.saveToken(json);
    },

    async getUserEmail(userId) {
        const url = `${Config.apiUrl}/Users/GetUserEmail/${userId}`;
        const token = TokenUtility.getToken();

        const response = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(
                json.message ? json.message : 'Unable to get user email'
            );
        }

        return json;
    },

    async register(credentials) {
        const url = `${Config.apiUrl}/Authentication/Register`;

        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(
                json.message ? json.message : 'Unable to register'
            );
        }

        TokenUtility.saveToken(json);
    }
};

export default UsersService;