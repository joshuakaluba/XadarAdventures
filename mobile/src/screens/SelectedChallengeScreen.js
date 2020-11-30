import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Icon from "@expo/vector-icons";
import { Col, Grid } from "react-native-easy-grid";
import { Colors } from '../constants';
import { ChallengesRepository } from './../dataaccesslayer';
import {
    ChallengeDescriptionDialog,
    ParagraphChallenge,
    MultipleChoiceChallenge,
    ShortAnswerChallenge,
    SuccessSnackbar
} from '../components';

export default class SelectedChallengeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params.title,
            headerStyle: ApplicationDefaultSettings.headerStyle,
            headerTintColor: ApplicationDefaultSettings.headerTintColor,
            headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle,
            headerRight: () => (
                <Grid style={{ marginBottom: -3, marginRight: 20 }}>
                    <Col>
                        <Icon.MaterialIcons
                            onPress={() => {
                                params.showChallengeDescription();
                            }}
                            name={"info-outline"}
                            size={35}
                            color={Colors.headerTintColor} />
                    </Col>
                </Grid>
            )
        };
    };

    state = {
        loading: false,
        challenge: {},
        completed: false,
        showChallengeDescriptionModal: false,
        showSuccessToast: false
    };

    async componentWillMount() {
        await this._initScreenAsync();
    }

    _initScreenAsync = async (showSuccessToast) => {
        try {
            const challenge = this.props.navigation.getParam('challenge');
            const challengeCompleted = await ChallengesRepository.getChallengeCompletion(challenge);

            this.props.navigation.setParams({
                title: challenge.name,
                showChallengeDescription: this._showChallengeDescriptionModal.bind(this)
            });

            this.setState({ challenge, completed: challengeCompleted.completed });

            if (showSuccessToast != null) {
                this.setState({ showSuccessToast: true })
            }
        } catch (error) {
            Lib.showError(error);
        }
    }

    _showChallengeDescriptionModal = () => {
        this.setState({ showChallengeDescriptionModal: true });
    }

    _hideChallengeDescriptionModal = () => {
        this.setState({ showChallengeDescriptionModal: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.box, styles.body]}>
                    {
                        !!this.state.challenge && this.state.challenge.challengeType === 1 &&
                        <MultipleChoiceChallenge
                            challenge={this.state.challenge}
                            completed={this.state.completed}
                            onComplete={this._initScreenAsync.bind(this)} />
                    }
                    {
                        !!this.state.challenge && this.state.challenge.challengeType === 2 &&
                        <ShortAnswerChallenge
                            challenge={this.state.challenge}
                            completed={this.state.completed}
                            onComplete={this._initScreenAsync.bind(this)} />
                    }
                    {
                        !!this.state.challenge && this.state.challenge.challengeType === 3 &&
                        <ParagraphChallenge
                            challenge={this.state.challenge}
                            completed={this.state.completed}
                            onComplete={this._initScreenAsync.bind(this)} />
                    }
                </View>

                <ChallengeDescriptionDialog
                    loading={this.state.loading}
                    challenge={this.state.challenge}
                    onDismiss={this._hideChallengeDescriptionModal.bind(this)}
                    visible={this.state.showChallengeDescriptionModal} />

                <SuccessSnackbar
                    visible={this.state.showSuccessToast}
                    snackBarText={`Challenge completed successfully`}
                    onDismiss={() => this.setState({ showSuccessToast: false })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: Colors.white,
        flexDirection: 'column'
    },
    box: {
        flex: 1
    },
    body: {
        flex: 10
    },
    footer: {
        flex: 2,
        justifyContent: "center"
    }
});
