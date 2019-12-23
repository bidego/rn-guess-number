import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import BText from '../components/BText';
import { Ionicons } from '@expo/vector-icons';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <View style={styles.button}>
                    <BText style={{...styles.buttonText, ...props.style}}>{props.children}
                        {props.title}
                    </BText>
                    <Ionicons name="logo-dribbble" size={16} color='white' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 160
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: 'white',
        fontSize: 15
    }
});

export default MainButton;