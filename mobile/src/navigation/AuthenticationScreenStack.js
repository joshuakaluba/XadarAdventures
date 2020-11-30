import { createStackNavigator } from "react-navigation-stack";
import AuthenticationScreen from '../screens/AuthenticationScreen';

const AuthenticationScreenStack = createStackNavigator({
  Links: AuthenticationScreen
});

export default AuthenticationScreenStack;
