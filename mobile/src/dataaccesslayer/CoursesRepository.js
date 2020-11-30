import { Uri } from '../constants';
import { AsyncStorageUtil, Lib } from '../utilities';

export default CoursesRepository = {
    async getCourses() {
        const token = await AsyncStorageUtil.getAccessToken();
        const response = await fetch(`${Uri.baseServerApi}/Courses/GetCourses`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const json = await response.json();

        await Lib.processServerResponse(
            response.status,
            json,
            'Unable to get courses'
        );
        return json;
    },
    
    async getMyEnrolledCourses() {
        const token = await AsyncStorageUtil.getAccessToken();
        const response = await fetch(`${Uri.baseServerApi}/Courses/GetMyEnrolledCourses`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const json = await response.json();

        await Lib.processServerResponse(
            response.status,
            json,
            'Unable to get my enrolled courses'
        );
        return json;
    },

    async enrollInCourse(enrollment) {
        const token = await AsyncStorageUtil.getAccessToken();
        const response = await fetch(
            `${Uri.baseServerApi}/Courses/EnrollInCourse`,
            {
                method: 'post',
                body: JSON.stringify(enrollment),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const json = await response.json();

        if (response.status != 200) {
            throw new Error(json.message ? json.message : 'Unable to enroll in course');
        }

        return json;
    }
};
