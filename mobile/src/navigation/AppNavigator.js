import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppLoadingScreen from "../screens/AppLoadingScreen";
import AuthenticationScreenStack from "./AuthenticationScreenStack";
import CoursesScreenStack from "./CoursesScreenStack";

const switchNavigator = createSwitchNavigator(
    {
        AppLoading: AppLoadingScreen,
        App: CoursesScreenStack,
        Auth: AuthenticationScreenStack
    },
    {
        initialRouteName: "AppLoading"
    }
);

export default createAppContainer(switchNavigator);
