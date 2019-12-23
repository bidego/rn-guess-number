import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BText from '../components/BText';
import ResetButton from '../components/ResetButton';
import ConfirmButton from '../components/ConfirmButton';
import { Ionicons } from '@expo/vector-icons';

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
const renderListItem = (val, round, total, availableHeight) => {
    let dinamicStyle = function() {
        if(round === total) {
            if (availableHeight > 400) {
                return { width: '80%', backgroundColor: '#ccc' }
            } else {
                return { width: '60%', backgroundColor: '#ccc' }
            };
        } else {
            return { width:'60%' }
        }
    } 
    return (
        <View key={val} style={{...styles.listItem, ...dinamicStyle()}}>
            <BText>#{round}</BText>
            <BText>{val}</BText>
        </View>
)};

const GameScreen= props => {
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
    const [ pastGuesses, setPastGuesses ] = useState([initialGuess]);
    const [ availableHeight, setAvailableHeight ] = useState(Dimensions.get('window').height);
    const currentLo = useRef(1);
    const currentHi = useRef(100);

    const { userChoice, onGameOver } = props;
    useEffect( () => {

        const updateLayout = () => {
            setAvailableHeight(Dimensions.get('window').height);
        };

        if (currentGuess === props.userChoice) {
            onGameOver(pastGuesses.length);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
        
    }, [currentGuess, userChoice, onGameOver, setAvailableHeight, Dimensions]);

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
    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, marginTop: availableHeight > 600 ? 20 : 5}}>
                <ResetButton title='LOWER' onPress={handleNextGuess.bind(this,'lower')} />
                <ConfirmButton title='GREATER' onPress={handleNextGuess.bind(this,'greater')} />
            </Card>
        </React.Fragment>
    );
     
    if (availableHeight < 500) {
        gameControls =  (
            <View style={styles.buttonContainer}>
                <ResetButton onPress={handleNextGuess.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </ResetButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <ConfirmButton onPress={handleNextGuess.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </ConfirmButton>
            </View>
        );
    }

    
    return (
        <ScrollView>

            <View style={styles.screen}>
                <TitleText>Round: {pastGuesses.length}</TitleText>
                <BText>Opponent's guess:</BText>
                {gameControls}
                <View style={styles.listContainer}>
                    <ScrollView
                        contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index, pastGuesses.length, availableHeight))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
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
        justifyContent: 'space-around'
    }
});

export default GameScreen;