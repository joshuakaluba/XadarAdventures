
import Config from '../Config';
import TokenUtility from './../utilities/TokenUtility';

const ChallengesService = {

    async getChallenge(challengeId) {
        const url = `${Config.apiUrl}/Challenges/GetChallenge/${challengeId}`;
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
                json.message ? json.message : 'Unable to get challenge'
            );
        }
        
        return json;
    },

    async getAllChallengesByCourse(id) {
        const url = `${Config.apiUrl}/Challenges/GetAllChallengesByCourse/${id}`;
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
                json.message ? json.message : 'Unable to get challenges'
            );
        }

        return json;
    },    
    
    async getUserCourseChallenges(courseId, userId) {
        const url = `${Config.apiUrl}/Challenges/GetUserCourseChallenges?courseId=${courseId}&userId=${userId}`;
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
                json.message ? json.message : 'Unable to get user challenges'
            );
        }

        return json;
    },

    async createChallenge(challenge) {
        const url = `${Config.apiUrl}/Challenges/CreateChallenge`;
        const token = TokenUtility.getToken();

        const response = await fetch(
            url,
            {
                method: "post",
                body: JSON.stringify(challenge),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(
                json.message ? json.message : 'Unable to create challenge'
            );
        }


        return json;
    }

};

export default ChallengesService;