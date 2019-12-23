import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, TouchableWithoutFeedback,
    Keyboard, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import BText from '../components/BText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import ResetButton from '../components/ResetButton';
import ConfirmButton from '../components/ConfirmButton';

const StartGameScreen= props => {
    const [ enteredValue, setEnteredValue ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    const [ selectedNumber, setSelectedNumber ] = useState()
    const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width/3);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width/3);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
    })

    const handleReset = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const handleInput = value => {
        setEnteredValue(value.replace(/[^0-9]/g, ''));
    }

    const handleConfirm = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Only numbers between 1 and 99',
                [{ text: 'Ok!', style: 'destructive', onPress: handleReset }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <BText>You selected:</BText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton title='NEW GAME' onPress={() => props.onStartGame(selectedNumber)}/>
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={()=> {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText>The StartGameScreen</TitleText>
                        <Card style={styles.inputContainer}>
                            <BText>Select a number</BText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitaliza='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={3}
                                onChangeText={handleInput}
                                value={enteredValue}
                                />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <ResetButton
                                        title="Reset"
                                        onPress={handleReset}
                                        />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <ConfirmButton
                                        title="Confirm"
                                        onPress={handleConfirm}
                                        />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer:{
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center'
    },
    input: {
        width: 100
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    summaryContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;