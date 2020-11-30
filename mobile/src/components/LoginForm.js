import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Validator from 'validator';
import { DefaultStyles, Colors } from '../constants';
import { Lib, AsyncStorageUtil } from '../utilities';
import PrimaryButton from './PrimaryButton';
import PrimaryFormInput from './PrimaryFormInput';

const LoginForm = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _logInAsync = async () => {
        setLoading(true);
        try {
            const response = await UserAccountRepository.logIn({ email, password });
            await AsyncStorageUtil.saveToken(response);
            navigation.navigate('App');
            return;
        } catch (error) {
            Lib.showError(error);
            setLoading(false);
        }
    };

    return (
        <View
            style={styles.container}>
            <View style={DefaultStyles.mainView}>

                <PrimaryFormInput
                    label={'Email'}
                    placeholder={'Email'}
                    editable={!loading}
                    onChangeText={value => setEmail(value)}
                    value={email} />

                <PrimaryFormInput
                    label={'Password'}
                    placeholder={'Password'}
                    onChangeText={value => setPassword(value)}
                    editable={!loading}
                    secureTextEntry={true} />

                <PrimaryButton
                    title={'Log in'}
                    onPress={_logInAsync}
                    disabled={
                        loading ||
                        !Validator.isEmail(email) ||
                        password.length < 2
                    }
                    loading={loading} />
            </View>
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColor: Colors.bodyBackgroundColor,
        padding: 10
    }
});
