import React from 'react';
import CourseCard from './CourseCard';

const CoursesList = (props) => {
    return (
        <div className='columns is-multiline'>
            {
                !!props.courses && props.courses.length > 0 && props.courses.map(course =>
                    <CourseCard course={course} key={course.id} />
                )
            }
        </div>
    );
};

export default CoursesList;