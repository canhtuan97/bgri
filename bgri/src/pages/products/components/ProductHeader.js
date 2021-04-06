import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
var BackgroundStyle = {
  height: '100%',
  width: '100%',
};

var ProductStyle = {
  height: 150,
  alignItems: 'center',
  marginTop: -150,
};
var ProductImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
};
var BackButtonStyle = {
  height: 23,
  width: 23,
  marginTop: '-45%',
  marginLeft: "2%",
};

const ProductHeader = (props) => {
  const navigation = useNavigation();
  const name = props.name;
  return (
    <View style={{flex: 50}}>
      <View style={BackgroundStyle}>
        <ImageBackground
          source={require('images/settings/settingbackground.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
        />
      </View>
      <View style={ProductStyle}>
        <Text style={{fontSize: 16, color: '#01A1C6', fontWeight: 'bold'}}>
          {name}
        </Text>
        <Image
          style={ProductImageStyle}
          source={require('images/settings/Product2.png')}></Image>
      </View>
      <TouchableOpacity style={BackButtonStyle} onPress={()=>{
        navigation.goBack();
      }}>
        <Image source={require('images/settings/settingback.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};
export default ProductHeader;
