import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TemplateScreen= props => {
    return (
        <View style={styles.screen}>
            <Text>Template screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const styles = StyleSheet.create({});

export default TemplateScreen;