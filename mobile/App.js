import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleProvider } from 'native-base';
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import { AppLoading, } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from "./src/constants";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Remote debugger', 'Native splash screen is already hidden', 'componentWillMount', 'componentWillReceiveProps']);

theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        accent: "yellow"
    }
};

export default class App extends React.Component {

    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <StyleProvider style={getTheme(commonColor)}>
                    <PaperProvider theme={theme}>
                        <View style={styles.container}>
                            {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
                            <AppNavigator />
                        </View>
                    </PaperProvider>
                </StyleProvider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
                Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
                Roboto: require("./assets/fonts/Roboto-Medium.ttf"),
            })
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    }
});
