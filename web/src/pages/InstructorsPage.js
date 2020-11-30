import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';
import { CoursesService } from "./../services";
import {
    CoursesList,
    PageHeader,
    NoDataCard,
    AddNewCourseModal
} from "./../components";

const InstructorsPage = () => {

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [courses, setCourses] = useState([]);
    const [showAddNewCourseModal, _setShowAddNewCourseModal] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");

    useEffect(() => {
        const init = async () => {
            await _getCoursesAsync();
        };
        init();
    }, []);

    const _onAddCourseButtonClick = () => _setShowAddNewCourseModal(true);

    const _clearAddNewCourseForm = () => {
        setNewCourseDescription("");
        setNewCourseName("");
    };

    const _getCoursesAsync = async () => {
        try {
            setLoading(true);
            const courses = await CoursesService.getAllCourses();

            setCourses(courses);
        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    const _addNewCourseAsync = async () => {
        try {
            _setShowAddNewCourseModal(false);
            setLoading(true);
            const course = {
                name: newCourseName,
                description: newCourseDescription
            };

            await CoursesService.createCourse(course);
            await _getCoursesAsync();

            _clearAddNewCourseForm();

            addToast('Course saved successfully', { appearance: 'success' });

        } catch (error) {
            setShowErrorMessage(true);
            setErrorMessage(error.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <PageHeader
                title={'Courses'}
                loading={loading}
                showErrorMessage={showErrorMessage}
                errorMessage={errorMessage}
                showAddButton={true}
                addButtonTitle={'Add new course'}
                onAddClick={_onAddCourseButtonClick} />

            {
                courses.length === 0 &&
                <NoDataCard noDataText="There are currently no courses available" />
            }

            <CoursesList courses={courses}></CoursesList>

            <AddNewCourseModal
                loading={loading}
                visible={showAddNewCourseModal}
                newCourseName={newCourseName}
                newCourseDescription={newCourseDescription}
                onDismiss={() => { _setShowAddNewCourseModal(false); }}
                onCourseNameChange={(e) => { setNewCourseName(e.target.value); }}
                onCourseDescriptionChange={(e) => { setNewCourseDescription(e.target.value); }}
                addNewCourse={_addNewCourseAsync}/>

        </div>
    );
};

export default InstructorsPage;
