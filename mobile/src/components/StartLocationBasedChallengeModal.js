import React from "react";
import {
    Modal,
    StyleSheet,
    TouchableHighlight,
    View
} from "react-native";
import Colors from '../constants/Colors';
import QRScanner from './QRScanner';

const StartLocationBasedChallengeModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            style={{ backgroundColor: Colors.bodyBackgroundColor, }}
            onRequestClose={props.onDismiss}>

            {<View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableHighlight
                        style={{ backgroundColor: "#ffffff" }}
                        onPress={props.onDismiss}>
                        <QRScanner
                            onDismiss={props.onDismiss}
                            challenge={props.challenge}
                            onCompleteScan={props.onCompleteScan} />
                    </TouchableHighlight>
                </View>
            </View>}
        </Modal>
    );
};

export default StartLocationBasedChallengeModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        backgroundColor: Colors.white
    },
    modalView: {
        backgroundColor: "red",
        borderRadius: 20,
        alignItems: "center"
    }
});

