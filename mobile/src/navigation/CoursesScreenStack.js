import { createStackNavigator } from 'react-navigation-stack';
import { CoursesScreen, ChallengesScreen, SelectedChallengeScreen } from '../screens';

const CoursesScreenStack = createStackNavigator({
    Courses: CoursesScreen,
    Challenges: ChallengesScreen,
    SelectedChallenge: SelectedChallengeScreen
});

export default CoursesScreenStack;
