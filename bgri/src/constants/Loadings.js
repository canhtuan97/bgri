import React,{useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingsComponent=(props) => {
    const {display}=props;
    return (
        <Spinner visible={display} textContent={'Loading...'} />
        )
}
export default LoadingsComponent;