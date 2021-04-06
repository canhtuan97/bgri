import React, {Component} from 'react';
import {View,Image} from 'react-native';

var FooterStyle = {
  flex: 18,
  width: '100%',
};

export default class HomeFooter extends Component {
  render() {
    return (
      <View style={{flex: 18}}>
        <View style={FooterStyle}>
          <Image
            source={require('images/homepages/homepages4.png')}
            style={{
              marginTop:'5%',
              height: '90%',
              width: '100%',
              resizeMode: 'cover',
              justifyContent: 'center',
            }}
          />
        </View>
      </View>
    );
  }
}
