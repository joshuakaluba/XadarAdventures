import React, { useState, useEffect } from "react";
import { CoursesList, PageHeader } from "./../components";
import { CoursesService } from "./../services";

const CoursesPage = () => {

    const [loading, setLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const init = async () => {
            await _getCoursesAsync();
        };
        init();
    }, []);

    const _getCoursesAsync = async () => {
        try {
            const courses = await CoursesService.getAllCourses();
            setCourses(courses);
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeader
                title={'Courses'}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage} />

            <CoursesList courses={courses} showEnrollButton={true} />
        </div>
    );
};

export default CoursesPage;
