import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {generateShadow} from 'react-native-shadow-generator';

var ContainerStyle = {
    width:78,
    height: 78,
    borderRadius:39,
    marginTop: '4%',
    marginLeft: '5%',
    backgroundColor: '#fff',
    ...generateShadow(5),
    // borderRadius: 10,
   
  };
  var AvatarImageStyle = {
    height: 54,
    width: 54,
    borderRadius: 27,
    marginLeft: 10,
    marginTop: 10,
  };
 

function Search() {
  const navigation = useNavigation();
    return (
         <TouchableOpacity
              style={ContainerStyle}
              onPress={() =>
                navigation.navigate('FindSourceProduct', {
                })
              }
              >
              <View style={AvatarImageStyle}>
                <Image style={{width:54,height:54}}
                source={require('images/qr-code-scan.png')}></Image>
              </View>
            </TouchableOpacity>
    );
}

export default Search;