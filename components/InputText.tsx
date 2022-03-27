import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import Colors from '../constants/Colors';

interface Objects {
    label: string,
    action: () => void,
    styling?: object,
    placeholder?: string,
    password?: string,
    keyboardType?: string,
    autoCapitalize?: string
}

const InputText = ({
    label, 
    action,
    styling, 
    placeholder, 
    password, 
    keyboardType='default', 
    autoCapitalize = 'sentences'
} : Objects) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput  
                placeholder={placeholder}
                onChangeText={action}
                style={{...styles.textInput, ...styling}}
                secureTextEntry={password}
                keyboardType={keyboardType}
                autoCapitalize = {autoCapitalize}
            />
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    label: {
        color: Colors.palleteColor.green,
        fontSize: 14,
    },
    textInput: {
        borderBottomColor: Colors.palleteColor.green,
        borderBottomWidth: 1,
        padding: 10,
        width: 350,
        color: Colors.palleteColor.darkGray,
        fontSize: 20,
        marginVertical: 5
    }
})
