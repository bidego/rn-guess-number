import React from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BText from '../components/BText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>

            <View style={styles.screen}>
                <TitleText>The game is Over.</TitleText>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../assets/success.png')}
                        //source={{uri: 'https://pbs.twimg.com/profile_images/653558348273569792/joxg8DZD_400x400.png'}}
                    />
                </View>
                <View style={styles.statisticContainer}>
                    <Card style={styles.block}>
                        <BText>Your Number</BText>
                        <NumberContainer>{props.userNumber}</NumberContainer>
                    </Card>
                    <Card style={styles.block}>
                        <Text>Rounds: </Text>
                        <NumberContainer>{props.numOfRounds}</NumberContainer>
                    </Card>
                </View>
                <MainButton title='New Game' onPress={props.onRestart.bind(this)} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statisticContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    block: {
        flex:1,
        margin: 20,
        alignItems: 'center'
    },
    image: {
        width: '100%', height: '100%'
    },
    imageContainer: {
        borderRadius: 100,
        width: Dimensions.get('window').height > 600 ? 200 : 100,
        height: Dimensions.get('window').height > 600 ? 200 : 100,
        borderWidth: 3,
        borderColor: Colors.primary,
        overflow: 'hidden',
        marginVertical: 10,
        elevation: 10
    }
});

export default GameOverScreen;