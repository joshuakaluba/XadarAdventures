import React from 'react';
import { List } from 'native-base';
import ChallengeListItem from './ChallengeListItem';

const ChallengesList = (props) => {
    return (
        <List>
            {props.challenges.map(challenge => (
                <ChallengeListItem
                    key={challenge.id}
                    challenge={challenge}
                    onSelectChallenge={props.onSelectChallenge} />
            ))}
        </List>
    );
};

export default ChallengesList;
