import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';
import ChallengesRepository from './../dataaccesslayer/ChallengesRepository';
import Lib from './../utilities/Lib';
import { MultipleChoiceOptions } from '../constants';
import PrimaryDropdown from './PrimaryDropdown';

const MultipleChoiceChallenge = (props) => {

    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    const _completeChallengeAsync = async () => {
        setLoading(true);

        try {

            const completedChallenge = {
                'challengeId': props.challenge.id,
                'completed': true
            };

            if (selectedOption === props.challenge.multipleChoiceSolution) {
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

    const _onChangeDropDownItem = (item) => {
        setSelectedOption(item.value);
    }

    const options = JSON.parse(props.challenge.multipleChoiceOptions);

    return (

        <View style={styles.container}>
            <View style={[styles.box, styles.body]}>
                <ScrollView>
                    <Text style={styles.multipleChoiceQuestion}>
                        {!!props.challenge && !!props.challenge.multipleChoiceQuestion && props.challenge.multipleChoiceQuestion}
                    </Text>

                    <Text style={styles.multipleChoiceSolution}>
                        {`1. ${!!props.challenge && !!props.challenge.multipleChoiceOptions && options.multipleChoiceOption1}`}
                    </Text>

                    <Text style={styles.multipleChoiceSolution}>
                        {`2. ${!!props.challenge && !!props.challenge.multipleChoiceOptions && options.multipleChoiceOption2}`}
                    </Text>

                    <Text style={styles.multipleChoiceSolution}>
                        {`3. ${!!props.challenge && !!props.challenge.multipleChoiceOptions && options.multipleChoiceOption3}`}
                    </Text>

                    <Text style={styles.multipleChoiceSolution}>
                        {`4. ${!!props.challenge && !!props.challenge.multipleChoiceOptions && options.multipleChoiceOption4}`}
                    </Text>

                    <PrimaryDropdown
                        onChangeItem={_onChangeDropDownItem}
                        disabled={props.completed}
                        options={MultipleChoiceOptions} />

                </ScrollView>
            </View>

            <View style={[styles.box, styles.footer, { alignItems: "center" }]}>
                <PrimaryButton
                    onPress={_completeChallengeAsync}
                    title={props.completed === true ? 'Challenge Completed' : 'Complete'}
                    disabled={props.completed || selectedOption < 0}
                    loading={loading} />
            </View>
        </View>
    );
};

export default MultipleChoiceChallenge;

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
    multipleChoiceQuestion: {
        fontSize: 18,
        paddingBottom: 20,
        paddingTop: 20,
        fontWeight: 'bold'
    },
    multipleChoiceSolution: {
        fontSize: 16,
        paddingBottom: 15,
        paddingTop: 15
    },
    footer: {
        flex: 2,
        justifyContent: "center"
    }
});
