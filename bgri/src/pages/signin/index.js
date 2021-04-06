import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  absolute,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {URL_LOGIN} from 'url';
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
import { useDispatch} from 'react-redux';
import {set} from 'src/redux/user/userSlice';

export default Signin = ({navigation}) => {
  const dispatch = useDispatch();
  const hardwareBackPressCustom = useCallback(() => {
    return true;
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom,
      );
    };
  }, []);
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [change, setChange] = useState(false);
  const [check, setCheck] = useState();
  const [account, setAccount] = useState({
    email: '',
    password: '',
    errorMessage: null,
  });

  useEffect(() => {
    setAlert1(false);
  }, [check]);
  useEffect(() => {
    if (check === 1) {
      navigation.navigate('HomePage1');
    }
    if (check === 2) {
      navigation.navigate('ListProduct');
    }
    if (check === 3) {
      navigation.navigate('ListProduct');
    }
    if (check === 0) {
      setAlert2(true);
     
    }
    if(check === 4){
      setAlert3(true);
     
    }
    if(check ===-1){
      setAlert(true);
     
    }
  }, [change]);
  useEffect(() => {
    
    return () => {
      // clearTimeout(myTimeOut);
    };
  }, []);
  const handleSignin = () => {
    if (check === -1) {
      setAlert1(true);
    }
    const {email, password} = account;
    if (email.trim() != '' && password.trim() != '') {
      axios
        .post(
          URL_LOGIN,
          {
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            dispatch(set(response.data));
            if (response.data.user.role === '1') {
              setCheck(1);
              setChange(!change);
            }
            if (response.data.user.role === '2') {
              setCheck(2);
              setChange(!change);
            }
            if (response.data.user.role === '3'){
              setCheck(3);
              setChange(!change);
            }
          }else{
            if (response.data.status === 500) {
              setCheck(-1);
              setChange(!change);
            }
          }
        })
        
      myTimeOut = setTimeout(() => {
        setCheck(0);
        setChange(!change);
        setAlert1(false);
      }, 5000);
    }else{
      setCheck(4);
      setChange(!change);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <Text
          style={{
            color: '#A4A4A4',
            fontSize: 17,
            marginLeft: '80%',
            marginTop: '2%',
          }}>
   
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 35,
          flex: 20,
          alignItems: 'center',
        }}>
        <Image source={require('images/signins/image1.png')} />
        <Text
          style={{
            color: '#85AB03',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {' '}
          CHÀO MỪNG
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBottom: 80,
        }}></View>
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

        <TouchableOpacity style={ButtonContainerStyle} onPress={handleSignin}>
          <Text style={ButtonStyle}> Đăng nhập </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#A4A4A4', fontSize: 15}}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: '#A4A4A4', fontSize: 15}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 30,
        }}>
        <ImageBackground
          source={require('images/signins/image4.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
          }}
        />
      </View>
      <AwesomeAlert
        contentContainerStyle={{height: '20%',width:'90%'}}
        show={alert}
        showProgress={false}
        title="Cảnh Báo"
        message="Bạn nhập sai tài khoản hoặc mật khẩu"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="     OK     "
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setAlert(false);
        }}
      />
      <AwesomeAlert
        contentContainerStyle={{height: '20%',width:'90%'}}
        show={alert2}
        showProgress={false}
        title="Cảnh Báo"
        message="Có lỗi kết nối, vui lòng thử lại sau"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="     OK     "
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setAlert2(false);
        }}
      />
       <AwesomeAlert
        contentContainerStyle={{height: '20%',width:'90%'}}
        show={alert3}
        showProgress={false}
        title="Cảnh Báo"
        message="Bạn nhập thiếu tài khoản hoặc mật khẩu"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="     OK     "
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setAlert3(false);
        }}
      />
      <Spinner
        cancelable={true}
        visible={alert1}
        textContent={'Loading...'}
        color="white"
      />
    </View>
  );
};
