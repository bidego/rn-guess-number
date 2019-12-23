import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText'
const Header = props => {
    return (
        <View style={{
                ...styles.headerBase,
                ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid })
            }}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    }
});
export default Header;