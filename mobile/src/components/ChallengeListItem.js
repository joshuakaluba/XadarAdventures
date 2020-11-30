import React from 'react';
import { ListItem, Text, Left, Right, Icon } from 'native-base';

const ChallengeListItem = (props) => {
    return (
        <ListItem onPress={() => { props.onSelectChallenge(props.challenge); }}>
            <Left>
                <Text>{!!props.challenge.name && props.challenge.name}</Text>
            </Left>
            <Right>
                {
                    props.challenge.completed === true ?
                        <Icon name={'checkmark-circle'} style={{ fontSize: 25, color: 'green' }} /> :
                        <Icon name={'arrow-forward'} />
                }
            </Right>
        </ListItem>
    );
};

export default ChallengeListItem;
