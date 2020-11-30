import React, { Component } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";
import * as Icon from "@expo/vector-icons";
import { Col, Grid } from "react-native-easy-grid";
import { CoursesRepository } from "../dataaccesslayer";
import { Lib, AsyncStorageUtil } from "../utilities";
import { Snackbar } from "react-native-paper";
import { Container, Tab, Tabs } from 'native-base';
import { Colors, ApplicationDefaultSettings } from "../constants";
import {
    NoDataCard,
    CoursesList,
    CourseEnrollmentDialog,
    CourseDetailsDialog,
    SuccessSnackbar
} from "../components";

export default class CoursesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Courses ',
            headerStyle: ApplicationDefaultSettings.headerStyle,
            headerTintColor: ApplicationDefaultSettings.headerTintColor,
            headerTitleStyle: ApplicationDefaultSettings.headerTitleStyle,
            headerRight: () => (
                <Grid style={{ marginBottom: -3, marginRight: 10 }}>
                    <Col>
                        <Icon.Ionicons
                            onPress={() => {
                                params.showEnrollInNewCourseDialog();
                            }}
                            name={"md-add"}
                            size={35}
                            color={Colors.headerTintColor} />
                    </Col>
                    <Col >
                        <Icon.Feather
                            style={{ marginLeft: 25, paddingTop: 5 }}
                            onPress={() => {
                                params.prompToLogout();
                            }}
                            name={"log-out"}
                            size={25}
                            color={Colors.headerTintColor} />
                    </Col>
                </Grid>
            )
        };
    };

    state = {
        loading: false,
        enrollmentCode: '',
        courses: [],
        allCourses: [],
        showEnrollmentDialog: false,
        showCourseDetailsDialog: false,
        showSaveConfirmationAlert: false
    };

    async componentWillMount() {
        this.props.navigation.setParams({
            showEnrollInNewCourseDialog: this._showEnrollInNewCourseDialog.bind(this),
            prompToLogout: this._prompToLogout.bind(this)
        });

        await this._getMyEnrolledCourses();
        await this._getAllCourses();
    }

    _prompToLogout = async () => {
        Alert.alert('Log out', 'Are you sure you want to log out?',
            [
                {
                    text: "Cancel",
                    onPress: () => {/** Do nothing */ },
                    style: "cancel"
                },
                { text: "OK", onPress: this._logOutAsync }
            ],
            { cancelable: false }
        );
    };

    _logOutAsync = async () => {
        try {
            await AsyncStorageUtil.clear();

            this.props.navigation.navigate('Auth');
        } catch (error) {
            this._endLoading();
            Lib.showError(error);
        }
    };

    _showSuccessSnackBar = () => this.setState({ showSaveConfirmationAlert: true });

    _endLoading = () => this.setState({ loading: false });

    _showEnrollInNewCourseDialog = () => {
        this.setState({ showEnrollmentDialog: true });
    };

    _showCourseDetailsDialog = () => {
        this.setState({ showCourseDetailsDialog: true });
    };

    _hideEnrollmentDialog = () =>
        this.setState({
            showEnrollmentDialog: false,
            enrollmentCode: ''
        });

    _hideEnrollmentDetailsDialog = () =>
        this.setState({
            showCourseDetailsDialog: false,
            enrollmentCode: ''
        });


    _getMyEnrolledCourses = async () => {
        try {
            this.setState({ loading: true });
            const courses = await CoursesRepository.getMyEnrolledCourses();
            this.setState({ courses, loading: false, showEnrollmentDialog: false });
        } catch (error) {
            Lib.showError(error);
        }
    };

    _getAllCourses = async () => {
        try {
            this.setState({ loading: true });
            let allCourses = await CoursesRepository.getCourses();

            // TODO better handle this to prevent showing courses already enrolled in all courses list
            for (let i = 0; i < this.state.courses.length; i++) {
                allCourses = allCourses.filter(item => item.id !== this.state.courses[i].id);
            }

            this.setState({ allCourses, loading: false, showEnrollmentDialog: false });
        } catch (error) {
            Lib.showError(error);
        }
    };

    _enrollInNewCourseAsync = async (enrollmentCode) => {
        try {
            this.setState({ loading: true });

            const enrollment = {
                enrollmentCode: !!enrollmentCode && this.enrollmentCode !== null ? enrollmentCode : this.state.enrollmentCode
            };

            await CoursesRepository.enrollInCourse(enrollment);
            await this._getMyEnrolledCourses();
            await this._getAllCourses();


            this._showSuccessSnackBar();
        } catch (error) {
            Lib.showError(error);
        }

        this._hideEnrollmentDialog();
        this._hideEnrollmentDetailsDialog();
        this.setState({ loading: false });
    };

    _viewSelectedCourse = (course) => {
        this.props.navigation.push("Challenges", { course });
    };

    _viewCourseDetails = (course) => {

        this.setState({ selectedCourse: course });
        this._showCourseDetailsDialog();
    };

    render() {
        return (
            <Container>
                <Tabs>
                    <Tab heading="My Enrolled Courses">
                        <View style={styles.container}>
                            <View style={[styles.box, styles.body]}>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={async () => {
                                                await this._getMyEnrolledCourses();
                                            }}
                                        />
                                    }>
                                    {this.state.courses && this.state.courses.length > 0 ? (
                                        <CoursesList
                                            courses={this.state.courses}
                                            onSelectCourse={this._viewSelectedCourse.bind(this)} />
                                    ) : (
                                            this.state.loading === false && (
                                                <NoDataCard
                                                    noDataOutput={"You are currently not enrolled in any courses"}
                                                    icon="emoji-sad"
                                                    noDataActionCall={this._showEnrollInNewCourseDialog.bind(this)}
                                                    noDataActionTitle={"Enroll In A New Course"} />
                                            )
                                        )}
                                </ScrollView>
                            </View>

                            <CourseEnrollmentDialog
                                loading={this.state.loading}
                                onChangeEnrollmentCode={value => this.setState({ enrollmentCode: value })}
                                enrollmentCode={this.state.enrollmentCode}
                                onPressEnrollInCourse={this._enrollInNewCourseAsync.bind(this)}
                                onDismiss={this._hideEnrollmentDialog.bind(this)}
                                visible={this.state.showEnrollmentDialog} />

                            <SuccessSnackbar
                                visible={this.state.showSaveConfirmationAlert}
                                snackBarText={`You are successfully enrolled`}
                                onDismiss={() => this.setState({ showSaveConfirmationAlert: false })} />

                        </View>
                    </Tab>
                    <Tab heading="All Courses">
                        <View style={styles.container}>
                            <View style={[styles.box, styles.body]}>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.loading}
                                            onRefresh={async () => {
                                                await this._getMyEnrolledCourses();
                                            }}
                                        />
                                    }>
                                    {this.state.allCourses && this.state.allCourses.length > 0 ? (
                                        <CoursesList
                                            courses={this.state.allCourses}
                                            onSelectCourse={this._viewCourseDetails.bind(this)} />
                                    ) : (
                                            this.state.loading === false && (
                                                <NoDataCard
                                                    noDataOutput={"Currently no courses"}
                                                    icon="emoji-sad" />
                                            )
                                        )}
                                </ScrollView>
                            </View>

                            <CourseDetailsDialog
                                loading={this.state.loading}
                                course={this.state.selectedCourse}
                                onPressEnrollInCourse={this._enrollInNewCourseAsync.bind(this)}
                                onDismiss={this._hideEnrollmentDetailsDialog.bind(this)}
                                visible={this.state.showCourseDetailsDialog} />

                            <Snackbar
                                visible={this.state.showSaveConfirmationAlert}
                                onDismiss={() => this.setState({ showSaveConfirmationAlert: false })}
                                action={{
                                    label: 'Dismiss',
                                    onPress: () => this.setState({ showSaveConfirmationAlert: false })
                                }}>
                                {'You are successfully enrolled'}
                            </Snackbar>
                        </View>

                    </Tab>
                </Tabs>
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
