import React from "react";
import "./App.sass";
import "./App.css";
import { Route, HashRouter } from "react-router-dom";
import { PrivateRoute, Navbar } from "./components";
import { AuthenticationContextProvider } from "./services/AuthenticationContext";
import { ToastProvider } from 'react-toast-notifications';
import {
    LoginPage,
    RegisterPage,
    CoursesPage,
    InstructorsPage,
    ChallengesPage,
    AddChallengePage,
    SelectedChallengePage,
    EnrolledStudentsCoursesPage,
    EnrolledStudentsChallengePage
} from "./pages";

const App = () => {
    return (
        <ToastProvider
            autoDismiss
            autoDismissTimeout={6000}
            placement="bottom-left">
            <AuthenticationContextProvider>
                <div>
                    <HashRouter>
                        <Navbar />
                        <div className="container main-app-body">
                            <div>
                                <PrivateRoute exact path="/courses" component={CoursesPage} />
                                <PrivateRoute exact path="/" component={InstructorsPage} />
                                <PrivateRoute exact path="/challenges/:id" component={ChallengesPage} />
                                <PrivateRoute exact path="/addchallenge/:id" component={AddChallengePage} />
                                <PrivateRoute exact path="/selectedchallenge/:id" component={SelectedChallengePage} />
                                <PrivateRoute exact path="/enrolledstudents/:id" component={EnrolledStudentsCoursesPage} />
                                <PrivateRoute exact path="/enrolledchallenge/:id/:studentId" component={EnrolledStudentsChallengePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </div>
                    </HashRouter>
                </div>
            </AuthenticationContextProvider>
        </ToastProvider>
    );
};

export default App;