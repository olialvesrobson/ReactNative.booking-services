import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

export default function fetchShifts() {
    useFirestoreConnect(['shift']); 
    const shifts = useSelector((state) => state.firestore.ordered.shift);
    
    return ( shifts );
};


