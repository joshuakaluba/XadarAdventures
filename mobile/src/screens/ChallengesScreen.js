import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import { ChallengesMap } from './../components';
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { NoDataCard, ChallengesList, StartLocationBasedChallengeModal } from "../components";
import { ChallengesRepository } from "../dataaccesslayer";
import { Lib } from "../utilities";
import { Colors, } from "../constants";

export default class ChallengesScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: params.title,
            headerStyle: {
                backgroundColor: Colors.headerBackgroundColor
            },
            headerTintColor: Colors.headerTintColor,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        };
    };

    state = {
        loading: false,
        course: {},
        challenges: [],
        showScanQRCodeDialog: false,
        selectedChallenge: {}
    };

    async componentWillMount() {
        const course = this.props.navigation.getParam("course");

        this.props.navigation.setParams({
            title: course.name
        });

        this.setState({ course });
        await this._getAllChallengesByCourseAsync(course);
    }

    _getAllChallengesByCourseAsync = async (course) => {
        try {
            this.setState({ loading: true });
            const challenges = await ChallengesRepository.getAllChallengesByCourse(course);
            console.log(challenges);
            this.setState({ loading: false, challenges });
        } catch (error) {
            Lib.showError(error);
        }
    }

    _viewSelectedChallenge = (challenge) => {
        if (challenge.isLocationDependant && !challenge.completed) {
            this.setState({ showScanQRCodeDialog: true, selectedChallenge: challenge })
        } else {
            this._navigateToSelectedChallengePage(challenge);
        }
    }

    _navigateToSelectedChallengePage = (challenge) => {
        this.setState({ showScanQRCodeDialog: false });
        this.props.navigation.push("SelectedChallenge", { challenge });
    }

    wait = async (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    _onDismissModal = async (showError) => {
        this.setState({ showScanQRCodeDialog: false });

        await this.wait(1000);

        if (showError === true) {
            alert("Invalid QR code scanned for this challenge");
        }
    }

    render() {
        return (
            <Container>
                <Tabs>
                    <Tab heading='Map'>
                        <ChallengesMap
                            challenges={this.state.challenges}
                            onSelectChallenge={this._viewSelectedChallenge.bind(this)} />
                    </Tab>
                    <Tab heading='List'>
                        <Tab heading="My Enrolled Courses">
                            <View style={styles.container}>
                                <View style={[styles.box, styles.body]}>
                                    <ScrollView
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.loading}
                                                onRefresh={async () => {
                                                    await this._getAllChallengesByCourseAsync(this.state.course);
                                                }}
                                            />
                                        }>
                                        {this.state.challenges && this.state.challenges.length > 0 ? (
                                            <ChallengesList
                                                challenges={this.state.challenges}
                                                onSelectChallenge={this._viewSelectedChallenge.bind(this)} />
                                        ) : (
                                                this.state.loading === false && (
                                                    <NoDataCard
                                                        noDataOutput={"There are currently no challenges for this course"}
                                                        icon="emoji-sad" />
                                                )
                                            )}
                                    </ScrollView>
                                </View>
                            </View>
                        </Tab>
                    </Tab>
                </Tabs>

                <StartLocationBasedChallengeModal
                    visible={this.state.showScanQRCodeDialog}
                    challenge={this.state.selectedChallenge}
                    onCompleteScan={this._navigateToSelectedChallengePage.bind(this)}
                    onDismiss={this._onDismissModal.bind(this)} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.white
    },
    box: {
        flex: 1
    },
    body: {
        flex: 10
    }
});
