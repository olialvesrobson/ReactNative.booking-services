import { whileStatement } from '@babel/types';
import React from 'react';
import { View, Alert, Image, ImageBackground, StyleSheet, } from 'react-native';
import {  Text } from '../components/Themed';
import Button from '../components/Buttons';

function PublicScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageContainer}
                source={{uri: 'https://image.freepik.com/free-vector/hand-drawn-linear-engraved-floral-background_52683-71224.jpg'}} >
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.imageText}>Dude App</Text>
                </View>
            </ImageBackground>
                 
            <View style={styles.separator} />

            <View style={styles.containerRow}>
                <Button title={'login'} action={() => navigation.navigate('Signin')} />

                <Button title={'Register'} action={() => navigation.navigate('Signup')} />
                
                
            </View>
            
            <Button title={'Calendar'} action={() => navigation.navigate('Calendar')} />

        </View>
    )
};

export default PublicScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: 40,
    },
    containerRow: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    imageContainer: {
        top: 0,
        position: 'relative',
        textAlign: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 100,
    },
    image: {
        width: '100%',
        height: 100,
    },
    imageText: {
        
        color: '#aaa',
        fontSize: 20,
        fontWeight: 'bold',
    },
    
});
