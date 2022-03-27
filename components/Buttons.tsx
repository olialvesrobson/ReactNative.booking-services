import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import navigation from '../navigation';

interface Objects {
    title: string,
    action?: () => void,
    styling?: object,
}

const Button = ({title, action, styling} : Objects) => {
    return (
        <Pressable onPress={action} 
            style={{...styles.button, ...styling}}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: '#eee',
        marginHorizontal: 5,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.palleteColor.gray,
    },
    buttonText: {
        color: Colors.palleteColor.darkGray,
        fontSize: 18,
    },
});
