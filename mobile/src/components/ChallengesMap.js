import React from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const ChallengesMap = (props) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}>
                {!!props.challenges && props.challenges.map((challenge, index) => (
                    !!challenge.isLocationDependant && challenge.isLocationDependant === true &&
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseInt(challenge.latitude),
                            longitude: parseInt(challenge.longitude),
                        }}
                        title={challenge.name}
                        description={challenge.description}
                        onPress={()=>{props.onSelectChallenge(challenge)}}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default ChallengesMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
