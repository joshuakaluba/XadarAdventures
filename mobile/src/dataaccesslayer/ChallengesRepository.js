import { Uri } from '../constants';
import { AsyncStorageUtil } from '../utilities';

export default ChallengesRepository = {

    async getAllChallengesByCourse(course) {
        const token = await AsyncStorageUtil.getAccessToken();
        const url = `${Uri.baseServerApi}/Challenges/GetAllChallengesByCourse/${course.id}`;
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to enroll in course');
        }

        return json;
    },
    
    async getChallengeCompletion(challenge) {
        const token = await AsyncStorageUtil.getAccessToken();
        const url = `${Uri.baseServerApi}/Challenges/GetChallengeCompletion/${challenge.id}`;
        const response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to get challenge completion');
        }

        return json;
    },

    async completeChallenge(completedChallenge) {
        const token = await AsyncStorageUtil.getAccessToken();
        const response = await fetch(
            `${Uri.baseServerApi}/Challenges/CompleteChallenge`,
            {
                method: 'post',
                body: JSON.stringify(completedChallenge),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to complete challenge');
        }

        return json;
    },

};
