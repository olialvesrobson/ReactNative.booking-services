import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native';
import Button from '../../components/Buttons';
import InputText from '../../components/InputText';
import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../components/context';

export default function SignInScreen () {

    const { signIn } = React.useContext(AuthContext);
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignIn = (email: string, password: string) => {
        signIn(email, password);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.separate} />
            <View style={styles.form}>
                <View style={styles.formFields}>
                    <InputText 
                        label={'Email / Phone Number'}
                        placeholder={'Type a valide email / phone number'}
                        action={ (userlogin) => setUserLogin(userlogin) }
                        autoCapitalize={'none'}
                    />

                    <InputText 
                        label={'Password'}
                        placeholder={'Password'}
                        action={ (password) => setPassword(password) }
                        password={true}
                    />
                </View>
                <View style={styles.formButtons}>
                    
                    <Button title={'Sign In'}
                        action={() => {handleSignIn(userLogin, password)}}
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
