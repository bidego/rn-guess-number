import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import BText from '../components/BText';

const ResetButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <BText style={{...styles.buttonText, ...props.style}}>{props.children}
                    {props.title}
                </BText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width:'100%',
        alignItems:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 12
    }
});

export default ResetButton;