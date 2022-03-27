import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native';
import Button from '../../components/Buttons';
import InputText from '../../components/InputText';
import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';


export default function SignInScreen () {

    const [userLogin, setUserLogin] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.separate} />
            <View style={styles.form}>
                <View style={styles.formFields}>
                    <InputText 
                        label={'Email / Phone Number'}
                        placeholder={'Type a valide email / phone number'}
                        action={ (userlogin) => setUserLogin(userLogin) }
                        autoCapitalize={'none'}
                    />

                    <InputText 
                        label={'Password'}
                        placeholder={'Password'}
                        action={ (userlogin) => setUserLogin(userLogin) }
                        password={true}
                    />
                </View>
                <View style={styles.formButtons}>
                    
                    <Button title={'Sign In'}
                        action={() => Alert.alert('Signing in...')}
                        styling={{borderColor: '#4ea811'}}
                    />
                </View>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: Colors.palleteColor.gray,
        fontWeight: 'bold',
        fontSize: 24,
    },
    separate: {
        marginVertical: 20,
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 600
    },
    formFields: {
        flexDirection: 'column',
    },
    formButtons: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});
