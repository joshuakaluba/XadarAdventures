import { Uri } from '../constants';

export default UserAccountRepository = {
    async logIn(credentials) {
        const response = await fetch(`${Uri.baseServerApi}/Authentication/Login`, {
            method: 'post',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(
                json.message ? json.message : 'Unable to log in'
            );
        }
        return json;
    },

    async register(credentials) {
        const response = await fetch(
            `${Uri.baseServerApi}/Authentication/Register`,
            {
                method: 'post',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(
                json.message ? json.message : 'Unable to register'
            );
        }
        return json;
    },
};
