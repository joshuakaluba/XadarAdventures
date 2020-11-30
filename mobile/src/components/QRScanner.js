import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Colors } from '../constants';
import { Icon } from 'react-native-elements';
import { Uri } from '../constants';
import PrimaryButton from './PrimaryButton';


const QRScanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    async function _onBarCodeScanned(result) {
        try {
            const demoing = true;

            if (demoing) {
                props.onCompleteScan(props.challenge);
                return;
            }

            if (result.data.includes(props.challenge.id)) {
                props.onCompleteScan(props.challenge);
                return;
            } else {
                props.onDismiss(true);
            }
        } catch (error) {
            console.log(error);
            // do nothing
        }
    }

    let textOutput = 'Scan valid QR Code to start challenge.';

    if (hasPermission === null || hasPermission === false) {
        textOutput = 'Unable to access camera due to permissions.';
    }

    return (
        <View style={{ flex: 6, padding: 15, margin: 10, borderRadius: 5 }}>
            {
                hasPermission === true &&
                <Camera
                    style={[styles.row, { flex: 4 }]}
                    onBarCodeScanned={_onBarCodeScanned}
                    type={type} barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }} />
            }
            {
                (hasPermission === false || hasPermission === null) &&
                <View style={[styles.row, { backgroundColor: Colors.lightGrey, flex: 4 }]}>
                    <Icon
                        name='camera-off'
                        size={65}
                        type='feather'
                        color={Colors.darkGrey} />

                </View>
            }
            <View style={[styles.row, { flex: 2 }]}>
                <Text style={styles.outputText}> {textOutput}</Text>

                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                    This challenge requires the scanning of a QR Code placed at the location of the challenge
                </Text>
                <PrimaryButton title="Dismiss" onPress={props.onDismiss} />
            </View>

        </View>
    );
}

export default QRScanner;

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    outputText: {
        fontWeight: 'bold',
        fontSize: 18,
        minWidth: '100%',
        textAlign: 'center'
    }
});