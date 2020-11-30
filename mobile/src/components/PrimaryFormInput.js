import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Colors } from '../constants';

const PrimaryFormInput = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                label={props.label}
                editable={props.editable}
                value={props.value}
                placeholder={props.placeholder ? props.placeholder : ''}
                onChangeText={props.onChangeText}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={
                    props.secureTextEntry ? props.secureTextEntry : false
                }
            ></TextInput>
        </View>
    );
};

export default PrimaryFormInput;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: '100%',
        height: 45,
        backgroundColor: Colors.bodyBackgroundColor,
        textAlign: 'center',
        fontSize: 15,
        marginTop: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: Colors.lightGrey,
        color: Colors.darkGrey,
        fontWeight: '700'
    }
});
