import React from 'react';
import { Snackbar } from 'react-native-paper';

const SuccessSnackbar = (props) => {
    return (
        <Snackbar
            visible={props.visible}
            onDismiss={props.onDismiss}
            action={{
                label: 'Dismiss',
                onPress: props.onDismiss
            }}>
            {props.snackBarText}
        </Snackbar>
    );
};

export default SuccessSnackbar;
