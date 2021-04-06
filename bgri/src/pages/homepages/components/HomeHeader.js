import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
var AvatarImageStyle = {
  height: 108,
  width: 108,
  borderRadius: 54,
  marginLeft: '60%',
  marginTop: -80,
};
var UserContainerStyle = {
  height: 63,
  // width: 114,
  marginTop: -130,
  marginLeft: 50,
};
var ContainerStyle = {
  // height: '9%',
  width: '100%',
  marginTop: '8%',
  paddingTop: 7,
  paddingBottom: 7,
  alignItems: 'center',
};
var ButtonStyle = {
  height: 33,
  width: 100,
  backgroundColor: '#FFA800',
  borderRadius: 5,
  marginLeft: '70%',
  marginTop: '-6%',
};

const HomeHeader = (props) => {
  const {hiden} = props;
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  return (
    <View style={{flex: hiden ? 35 : 50}}>
      <View
        style={{
          height: hiden ? '120%' : '90%',
        }}>
        <ImageBackground
          source={require('images/homepages/homepages1.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
        />
      </View>
      <View style={UserContainerStyle}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {userInfo[0].user.name}
        </Text>
        <Text style={{color: 'white', fontSize: 20}}>
          {userInfo[0].user.email}
        </Text>
        <Text style={{color: 'white', fontSize: 20}}>
          {userInfo[0].user.role === '1'
            ? 'Quản trị liên nhóm'
            : userInfo[0].user.role === '2'
            ? 'Quản lý nhóm'
            : 'Hộ dân'}
        </Text>
      </View>
      <View style={AvatarImageStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('images/homepages/homepages2.png')}></Image>
        </TouchableOpacity>
      </View>
      {hiden ? (
        <View style={{flex: 0, marginTop: '-40%'}} />
      ) : (
        <View style={ContainerStyle}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000623',
                marginLeft: '-44%',
              }}>
              DANH SÁCH MÙA VỤ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ButtonStyle}
            onPress={() => {
              navigation.navigate('AddProduct');
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 4,
                marginLeft: 5,
              }}>
              {" + Tạo mới"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeHeader;
