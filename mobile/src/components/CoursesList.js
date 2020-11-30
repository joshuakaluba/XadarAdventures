import React from 'react';
import { List } from 'native-base';
import CourseListItem from './CourseListItem';

const CoursesList = (props) => {
    return (
        <List>
            {props.courses.map(course => (
                <CourseListItem
                    key={course.id}
                    course={course}                   
                    onSelectCourse={props.onSelectCourse}
                />
            ))}
        </List>
    );
};

export default CoursesList;
