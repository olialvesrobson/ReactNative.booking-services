import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

import Dimensions from '../../constants/Layout'; 
//import firebase from '../../config/config';

import moment from 'moment';
import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

let { width } = Dimensions.window;




function TabFeedScreen({navigation}) {

    const [shifts, setShifts] = useState([]);
    const [clients, setClients] = useState([]);
    
    //useFirestoreConnect([{ collection: 'clients' }]); 
    let fetchClients = useSelector((state) => state.firestore.data.clients);
    
    //useFirestoreConnect([{ collection: 'shift', orderBy: 'datestampShift' }]); 
    let fetchShifts = useSelector((state) => state.firestore.ordered.shift);
    
    
    useEffect(() => {
        setShifts(fetchShifts);
        setClients(fetchClients);
    }, [fetchShifts, fetchClients] );
    
    const getClientImages = (clientID) => {
        
        const result = clients[clientID].images ? 
            [{url: clients[clientID].images[0].url }]
            :
            [{url: 'https://image.freepik.com/free-photo/green-texture_1160-912.jpg'}];
            
        return result;
        
    }

    const renderItems = (item) => {
        
        const client = clients[item.clientLocation.value].FirstName + ' ' + clients[item.clientLocation.value].LastName;
        const address = clients[item.clientLocation.value].Address + ', ' + clients[item.clientLocation.value].Suburb; 

        return (
            <View style={styles.itemContainer}>
                
                <Image 
                    style={styles.itemImage}
                    source={{uri: getClientImages(item.clientLocation.value)[0].url}} />
                <View style={styles.itemDetailsContainer}>
                    <Text style={styles.itemTitle}>{client}</Text>
                    <Text style={styles.itemAddress}>{address}</Text>
                    <View style={styles.itemTimeContainer}>
                        <Text>{item.startIn.label}</Text>
                        <Text>{item.totalHoras.label}</Text>
                    </View>
                </View>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={shifts}
                renderItem={({item}) => renderItems(item)}
            />
        </View>
    ) 
};

export default TabFeedScreen;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',

    },
    itemContainer: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.palleteColor.lightGray,
        borderBottomWidth: 1,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderColor: Colors.palleteColor.green,
        borderWidth: 2,
        borderRadius: 15

    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',

    },
    itemAddress: {
        fontSize: 14,
        color: Colors.palleteColor.gray,

    },
    itemDetailsContainer: {
        paddingHorizontal: 10,
        flexDirection: 'column',
    },
    itemTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        

    },
    itemTimeText: {

    }
});
