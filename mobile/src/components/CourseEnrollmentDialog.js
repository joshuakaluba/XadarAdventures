import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import PrimaryFormInput from './PrimaryFormInput';

const CourseEnrollmentDialog = (props) => {
    return (
        <Portal>
            <Dialog
                visible={props.visible}
                style={styles.dialogBody}
                onDismiss={props.onDismiss}>
                <Dialog.Content>
                    <PrimaryFormInput
                        label={'Enrollment Code'}
                        placeholder={'Please enter a course enrollment code'}
                        value={props.enrollmentCode}
                        onChangeText={props.onChangeEnrollmentCode}
                    />
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <PrimaryButton
                        title={'Enroll'}
                        onPress={props.onPressEnrollInCourse}
                        loading={props.loading}
                        disabled={
                            props.enrollmentCode.trim().length < 5 || props.loading
                        } />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default CourseEnrollmentDialog;

const styles = StyleSheet.create({
    dialogBody: {
        paddingBottom: 10
    },
    dialogActions: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
