import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BText from '../components/BText';
import ResetButton from '../components/ResetButton';
import ConfirmButton from '../components/ConfirmButton';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rnd = Math.floor(Math.random() * (max - min)) + min;

    if (rnd === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rnd;
    }

}
const renderListItem = (val, round, total) => {
    let styleClass = (round === total) ? styles.listItemLast : styles.listItem; 
    return (
        <View key={val} style={styleClass}>
            <BText>#{round}</BText>
            <BText>{val}</BText>
        </View>
)};

const GameScreen= props => {
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
    const [ pastGuesses, setPastGuesses ] = useState([initialGuess]);
    const currentLo = useRef(1);
    const currentHi = useRef(100);

    const { userChoice, onGameOver } = props;
    useEffect( () => {
        if (currentGuess === props.userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const handleNextGuess = (direction) => {
        if ((direction == 'lower' && currentGuess < props.userChoice) || (direction == 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(`Dont lie, fuckin' bitch`, 'You know that is wrong', [ { text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHi.current = currentGuess;
        } else {
            currentLo.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLo.current, currentHi.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(cur => [nextNumber, ...cur] );
    }
    
    return (
        <View style={styles.screen}>
            <TitleText>Round: {pastGuesses.length}</TitleText>
            <BText>Opponent's guess:</BText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <ResetButton title='LOWER' onPress={handleNextGuess.bind(this,'lower')} />
                <ConfirmButton title='GREATER' onPress={handleNextGuess.bind(this,'greater')} />
            </Card>
            <View style={styles.listContainer}>
                <ScrollView
                    contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index, pastGuesses.length))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    listItemLast: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        margin: 10,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').height > 600 ? '60%' : '80%'

    }
});

export default GameScreen;