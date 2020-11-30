import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet, Text, ScrollView } from 'react-native';
import PrimaryButton from './PrimaryButton';

const ChallengeDescriptionDialog = (props) => {
    return (
        <Portal>
            <Dialog
                visible={props.visible}
                style={styles.dialogBody}
                onDismiss={props.onDismiss}>
                <Dialog.Content>
                    <Text style={styles.courseTitle}>{!!props.challenge && props.challenge.name}</Text>
                    <ScrollView>
                        <Text>{!!props.challenge && props.challenge.description}</Text>
                    </ScrollView>
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                    <PrimaryButton
                        title={'Dismiss'}
                        onPress={() => { props.onDismiss() }}
                        loading={props.loading} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default ChallengeDescriptionDialog;

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
        fontWeight: "bold",
        marginBottom: 5
    }
});
