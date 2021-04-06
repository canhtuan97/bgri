import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  absolute,
} from 'react-native';
import axios from 'axios';
import {URL_CREATE_ACCOUNT} from 'url';
import {URL_SIGNUP} from 'url';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
var SectionStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 0.5,
  borderColor: '#000',
  height: 40,
  width: '85%',
  borderRadius: 17,
  margin: 10,
};
var ButtonContainerStyle = {
  height: 45,
  width: '85%',
  margin: 10,
  backgroundColor: '#FE9A2E',
  alignItems: 'center',
  borderRadius: 17,
};
var ButtonStyle = {
  color: 'white',
  marginTop: 7,
  fontSize: 20,
};

var ImageStyle = {
  padding: 10,
  margin: 10,
  height: 25,
  width: 25,
  resizeMode: 'stretch',
  alignItems: 'center',
};
var radio_props = [
  {label: '  Người dùng', value: 4},
  {label: '  Hộ dân', value: 3},
  {label: '  Quản lý nhóm', value: 2},
  {label: '  Quản lý liên nhóm', value: 1},
];
var PickerStyle = {
  marginLeft: '7%',
  borderWidth: 0.5,
  borderColor: '#000',
  height: 45,
  width: '85%',
  borderRadius: 17,
  margin: 10,
}
export default Signup = ({navigation}) => {
  const [alert, setAlert] = useState({show:false,mess:''});
  const [display1, setDisplay1] = useState(false);
  const [account, setAccount] = useState({
    name: "",
    role: 1,
    status: 1,
    email: '',
    password: '',
    repass: '',
    address: '',
    privateKey: '',
    errorMessage: null,
  });

  handleSignin = () => {
    if (account.repass === account.password) {
      if (account.email.trim() != '' && account.password.trim() != '') {
      setDisplay1(true);
      axios
      .post(
        URL_SIGNUP,
        {
          name:account.name,
          email:account.email,
          password: account.password,
          passwordConfirmation:account.repass,
          role:account.role,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'JWT fefege...'
          },
        },
      )
      .then(
        (response) => {
          //console.log(response.data);
          if(response.data.status ===200) {
            if (response.data.status === 200) {
              setAlert({show: true, mess:"Đăng ký thành công"})
            }else {
              if (response.data.status === 500) {
                setAlert({show: true, mess: response.data.msg});
              }else{
                setAlert({show: true, mess: "Đã xảy ra lỗi"});
              }
            }
          }
        },
        (error) => {
          setAlert({show: true, mess: "Đã xảy ra lỗi"});
        },
      );
      } else {
        Alert.alert(
          'Warning',
          'Enter email and password',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      }
    } else {
      Alert.alert('mật khẩu nhập lại sai');
    }
    
  };

  return (
    <View style={{flex: 1 , backgroundColor:'#e9f5e6'}}>
      <View
        style={{
          marginTop: 35,
          flex: 20,
          alignItems: 'center',
        }}>
        <Image source={require('images/signins/image1.png')} />
      </View>

      
      <View style={PickerStyle}>
        <RNPickerSelect
          onValueChange={(value) => {
            setAccount({...account, role: value});
          }}
          items={radio_props}
          value = {account.role}
        />
      </View>
      <View
        style={{
          flex: 30,
          alignItems: 'center',
        }}>
        <View style={SectionStyle}>
          <Image
            source={require('images/signins/image5.png')}
            style={ImageStyle}
          />
          <TextInput
            style={{
              flex: 1,
              margin: 0.1,
              borderColor: 'gray',
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
              backgroundColor: '#EEEEEE',
            }}
            placeholder="Tên"
            value={account.name}
            autoCapitalize="none"
            onChangeText={(text) => {
              setAccount({...account, name: text});
            }}
          />
        </View>
        <View style={SectionStyle}>
          <Image
            source={require('images/signins/image5.png')}
            style={ImageStyle}
          />
          <TextInput
            style={{
              flex: 1,
              margin: 0.1,
              borderColor: 'gray',
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
              backgroundColor: '#EEEEEE',
            }}
            keyboardType="email-address"
            placeholder="Tên đăng nhập"
            value={account.email}
            autoCapitalize="none"
            onChangeText={(text) => {
              setAccount({...account, email: text});
            }}
          />
        </View>
        <View style={SectionStyle}>
          <Image
            source={require('images/signins/image6.png')} //Change your icon image here
            style={ImageStyle}
          />
          <TextInput
            style={{
              flex: 1,
              margin: 0.1,
              borderColor: 'gray',
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
              backgroundColor: '#EEEEEE',
            }}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Mật khẩu "
            value={account.password}
            onChangeText={(text) => {
              setAccount({...account, password: text});
            }}
          />
        </View>
        <View style={SectionStyle}>
          <Image
            source={require('images/signins/image6.png')} //Change your icon image here
            style={ImageStyle}
          />
          <TextInput
            style={{
              flex: 1,
              margin: 0.1,
              borderColor: 'gray',
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
              backgroundColor: '#EEEEEE',
            }}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Nhập lại mật khẩu"
            value={account.repass}
            onChangeText={(text) => {
              setAccount({...account, repass: text});
            }}
          />
        </View>

        <TouchableOpacity style={ButtonContainerStyle} onPress={handleSignin}>
          <Text style={ButtonStyle}> Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        contentContainerStyle={{height: '20%',width:'90%'}}
        show={alert.show}
        showProgress={false}
        title="Thông Báo"
        message={alert.mess}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="     OK     "
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          navigation.navigate('Signin');
        }}
      />
      <Spinner visible={display1} textContent={'Loading...'}/>
    </View>
  );
};
