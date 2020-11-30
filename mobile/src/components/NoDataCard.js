import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import * as Icon from '@expo/vector-icons';
import PrimaryButton from './PrimaryButton';

const NoDataCard = (props) => {
    return (
        <View style={styles.card}>
            <Icon.Entypo name={props.icon} size={35} color={Colors.accent} />
            <Text style={styles.noRecords}>{props.noDataOutput}</Text>
            { props.noDataActionCall && props.noDataActionTitle && (
                <PrimaryButton
                    onPress={() => {
                        props.noDataActionCall();
                    }}
                    title={props.noDataActionTitle}
                />
            )}
        </View>
    );
};

export default NoDataCard;

const styles = StyleSheet.create({
    card: {
        margin: 5,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 50,
        paddingBottom: 50,
        borderColor: Colors.lightGrey,
        borderWidth: 2,
        borderRadius: 12
    },
    noRecords: {
        fontSize: 14,
        fontWeight: '800',
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
        color: Colors.darkGrey
    }
});
