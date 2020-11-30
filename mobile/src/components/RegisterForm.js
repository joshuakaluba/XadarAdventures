import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { CheckBox } from 'react-native-elements';
import Validator from 'validator';
import { DefaultStyles, Uri, Colors } from '../constants';
import PrimaryButton from './PrimaryButton';
import PrimaryFormInput from './PrimaryFormInput';
import { UserAccountRepository } from '../dataaccesslayer';
import { AsyncStorageUtil, Lib } from '../utilities';

const RegisterForm = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const _registerAsync = async () => {
        try {
            setLoading(true);
            if (password.length < 6) {
                alert('Please enter a valid password. Password should be at least 6 characters');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords entered do not match');
                return;
            }

            const credentials = { email, password, confirmPassword };
            const response = await UserAccountRepository.register(credentials);

            await AsyncStorageUtil.saveToken(response);

            navigation.navigate('App');
            return;
        } catch (error) {
            Lib.showError(error);
            setLoading(false);
        }
    };

    const _openPrivacyPolicy = () => {
        WebBrowser.openBrowserAsync(Uri.privacyPolicy);
    };

    return (
        <View
            style={styles.container}>
            <View style={DefaultStyles.mainView}>

                <PrimaryFormInput
                    label={'Email'}
                    placeholder={'Email'}
                    editable={!loading}
                    onChangeText={value => setEmail(value)} />

                <PrimaryFormInput
                    label={'Password'}
                    placeholder={'Password'}
                    editable={!loading}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true} />

                <PrimaryFormInput
                    label={'Conform password'}
                    placeholder={'Conform password'}
                    editable={!loading}
                    onChangeText={value => setConfirmPassword(value)}
                    secureTextEntry={true} />

                <TouchableOpacity
                    onPress={_openPrivacyPolicy}
                    style={DefaultStyles.textLink}>
                    <Text style={DefaultStyles.textLinkText}>
                        {'Terms & Conditions'}
                    </Text>
                </TouchableOpacity>

                <CheckBox
                    title={'I have accepted the Terms/Conditions & Privacy Policy'}
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                    checked={acceptedTerms}
                />
                <PrimaryButton
                    title={'Register'}
                    onPress={_registerAsync}
                    loading={loading}
                    disabled={!acceptedTerms || !Validator.isEmail(email) || password !== confirmPassword} />
            </View>
        </View>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColor: Colors.bodyBackgroundColor,
        padding: 10
    }
});
