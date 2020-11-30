
import Config from '../Config';
import TokenUtility from './../utilities/TokenUtility';

const CoursesService = {

    async getAllCourses() {
        const url = `${Config.apiUrl}/Courses/GetCourses`;
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
                json.message ? json.message : 'Unable to get courses'
            );
        }

        return json;
    },
    
    async getCourse(courseId) {
        const url = `${Config.apiUrl}/Courses/GetCourse/${courseId}`;
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
                json.message ? json.message : 'Unable to get course'
            );
        }

        return json;
    },
    
    async getCourseEnrolledStudents(courseId) {
        const url = `${Config.apiUrl}/Courses/GetCourseEnrolledStudents/${courseId}`;
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
                json.message ? json.message : 'Unable to get course enrollments'
            );
        }

        return json;
    },

    async createCourse(course) {
        const url = `${Config.apiUrl}/Courses/CreateCourse`;
        const token = TokenUtility.getToken();

        const response = await fetch(
            url,
            {
                method: "post",
                body: JSON.stringify(course),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const json = await response.json();
        return json;
    }

};

export default CoursesService;