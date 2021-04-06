import React, { useState, useEffect} from 'react';
 
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import ResultHistory from './ResultHistory';
import ResultSource from './ResultSource';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

export const WriteHistory =(props) => {
  const [result, setResult] = useState(false);
  const [key,setKey] = useState();
  
  const  onSuccess = e => {
    // console.log(e.data);
    setKey(e.data);
    setResult(true);
  };
 
  if(result===false) {
    return (
      <QRCodeScanner
        onRead={onSuccess}
      />
    );
  }else{
    return(
      <ResultHistory keyQR={key}/>
    )
  }
}
export const FindSourceProduct = props =>{
  const [result, setResult] = useState(false);
  const [key,setKey] = useState();
  
  const  onSuccess = e => {
    // console.log(e.data);
    setKey(e.data);
    setResult(true);
  };
 
  if(result===false) {
    return (
      <QRCodeScanner
        onRead={onSuccess}
      />
    );
  }else{
    return(
      <ResultSource keyQR={key}/>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});