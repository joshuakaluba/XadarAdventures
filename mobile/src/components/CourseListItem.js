import React from 'react';
import { ListItem, Text, Left, Right, Icon } from 'native-base';

const CourseListItem = (props) => {
    return (
        <ListItem onPress={() => { props.onSelectCourse(props.course); }}>
            <Left>
                <Text>{!!props.course.name && props.course.name}</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" /> 
            </Right>
        </ListItem>
    );
};

export default CourseListItem;
