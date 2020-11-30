import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';
import ChallengesRepository from './../dataaccesslayer/ChallengesRepository';
import Lib from './../utilities/Lib';
import PrimaryFormInput from './PrimaryFormInput';

const ShortAnswerChallenge = (props) => {

    const [shortAnswer, setShortAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const _completeChallengeAsync = async () => {
        try {
            setLoading(true);
            const completedChallenge = {
                'challengeId': props.challenge.id,
                'completed': true
            };

            // Comparing apples to apples
            const solution = props.challenge.shortAnswerSolution.toUpperCase();
            const myAnswer = shortAnswer.toUpperCase().trim();

            const acceptedAnswers = solution.split(',').map(item => {
                return item.trim();
            });

            if (acceptedAnswers.includes(myAnswer)) {
                await ChallengesRepository.completeChallenge(completedChallenge);
                props.onComplete(true);
            } else {
                alert("Incorrect answer, try again")
            }
        } catch (error) {
            Lib.showError(error);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.box, styles.body]}>
                <ScrollView>
                    <Text style={styles.shortAnswerQuestion}>
                        {!!props.challenge && !!props.challenge.shortAnswerQuestion && props.challenge.shortAnswerQuestion}
                    </Text>

                    <PrimaryFormInput
                        label={'Enter your answer'}
                        placeholder={'Enter your answer'}
                        editable={!props.completed}
                        value={shortAnswer}
                        onChangeText={value => setShortAnswer(value)}
                        editable={!loading} />

                </ScrollView>
            </View>

            <View style={[styles.box, styles.footer, { alignItems: "center" }]}>
                <PrimaryButton
                    onPress={_completeChallengeAsync}
                    title={props.completed === true ? 'Challenge Completed' : 'Complete'}
                    disabled={props.completed}
                    loading={loading} />
            </View>
        </View>
    );
};

export default ShortAnswerChallenge;

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
        flex: 8
    },
    shortAnswerQuestion: {
        fontSize: 18,
        paddingBottom: 20,
        paddingTop: 20,
        fontWeight: 'bold'
    },
    footer: {
        flex: 2,
        justifyContent: "center"
    }
});
