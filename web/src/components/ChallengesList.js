import React from 'react';
import ChallengeCard from './ChallengeCard';

const ChallengesList = (props) => {
    return (
        <div className='columns is-multiline'>
            {
                !!props.challenges && props.challenges.length > 0 && props.challenges.map(challenge =>
                    <ChallengeCard challenge={challenge} showEnrollButton={props.showEnrollButton} key={challenge.id} />
                )
            }
        </div>
    );
};

export default ChallengesList;