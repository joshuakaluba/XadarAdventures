import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import Colors from './../constants/Colors';
import { LoginForm, RegisterForm } from './../components';

export default class AuthenticationScreen extends Component {

    static navigationOptions = {
        title: 'Please authenticate to continue',
        headerStyle: {
            backgroundColor: Colors.headerBackgroundColor
        },
        headerTintColor: Colors.headerTintColor,
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };

    render() {
        return (
            <Container>
                <Tabs>                   
                    <Tab heading="Register">
                        <RegisterForm navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Login">
                        <LoginForm navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}