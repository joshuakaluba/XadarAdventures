import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';

const CourseDetailsDialog = (props) => {

    const _enrollInCourseAsync = (course) => {
        props.onPressEnrollInCourse(course.enrollmentCode);
    }

    return (
        <Portal>
            <Dialog
                visible={props.visible}
                style={styles.dialogBody}
                onDismiss={props.onDismiss}>
                <Dialog.Content>
                    <Text style={styles.courseTitle}>{!!props.course && props.course.name}</Text>
                    <Text>{!!props.course && props.course.description}</Text>

                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <PrimaryButton
                        title={'Enroll'}
                        onPress={() => { _enrollInCourseAsync(props.course) }}
                        loading={props.loading} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default CourseDetailsDialog;

const styles = StyleSheet.create({
    dialogBody: {
        paddingBottom: 10
    },
    dialogActions: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseTitle: {
        fontSize: 18,
        fontWeight:"bold",
        marginBottom:5
    }
});
