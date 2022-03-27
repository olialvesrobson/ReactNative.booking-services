import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import EventCalendar from 'react-native-events-calendar';
import Dimensions from '../../constants/Layout'; 

import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import moment from 'moment';

let { width } = Dimensions.window;


function CalendarScreen () {
    const [events, setEvents] = useState([]);
    useFirestoreConnect([{ collection: 'shift', orderBy: ['datestampShift'] }, { collection: 'clients' }]); 
    const shifts = useSelector((state) => state.firestore.ordered.shift);

    
    const currentDate = new Date();
    let dateFormat = "YYYY-MM-DD HH:mm";

    

    const getEvents = () => {    
        
        let todos = shifts && shifts.map( shift => {
            const start = moment(shift.datestampShift).format(dateFormat);
            const totalHour = shift.totalHoras.value;
            const end = moment(start, dateFormat).add("hours", totalHour).format(dateFormat);
            const client = shift.clientLocation.label.split(' - ');
            
            return ({
                start: start,
                end: end,
                title: client[0],
                summary: client[1],
                id: shift.id,
                services: shift.services,
            })
        });
        
        setEvents(todos);
    }


    useEffect(() => {
        getEvents();
    }, []);


    return (
        <EventCalendar
            
            eventTapped={(event) => Alert.alert(event.title)}
            events={events}
            width={width}
            scrollToFirst={true}
            initDate={moment(currentDate).format("YYYY-MM-DD")}
            
        />
    )
};

export default (CalendarScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fed849'
    }, 
    event: {
        opacity: 0.5,
        backgroundColor: '#fed849'
    }
});
