import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MarkdownRenderer from './MarkdownRenderer';
import PrimaryButton from './PrimaryButton';
import ChallengesRepository from './../dataaccesslayer/ChallengesRepository';
import Lib from './../utilities/Lib';

const ParagraphChallenge = (props) => {

    const [loading, setLoading] = useState(false);

    const _completeChallengeAsync = async () => {
        setLoading(true);
        try {
            const completedChallenge = {
                'challengeId': props.challenge.id,
                'completed': true
            };
            await ChallengesRepository.completeChallenge(completedChallenge);
            props.onComplete(true);
        } catch (error) {
            Lib.showError(error);
        }
        setLoading(false);        
    }

    return (
        <View style={styles.container}>
            <View style={[styles.box, styles.body]}>
                <ScrollView>
                    <MarkdownRenderer markdown={props.challenge.paragraphText} />
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

export default ParagraphChallenge;

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
    footer: {
        flex: 2,
        justifyContent: "center"
    }
});
