import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {URL_ADD_HOUSE_HOLD} from 'url';
import {useSelector, useDispatch} from 'react-redux';
import {user} from 'src/redux/user/userSlice';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {setProducts, products} from 'src/redux/product/productSlice';
function AddHouseHold(props) {
  const listProduct = useSelector(products);
  const [alert, setAlert] = useState({show: false, mess: ''});
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [display, setDisplay] = useState(false);
  const [group, setGroup] = useState({name: '', email: ''});
  const route = useRoute();
  const contractId = listProduct[0]._id;
 
  const handleSubmit = () => {
    const {name, email} = group;
    if (name !== '' && email !== '') {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
        setAlert({show: true, mess: '      Đã có lỗi xảy ra    '});
      }, 10000);
      axios
        .post(
          URL_ADD_HOUSE_HOLD,
          {
            name, email,
            contract_id:contractId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': userInfo[0].access_token,
            },
          },
        )
        .then(
          (response) => {
              console.log(response.data)
            if (response.data.status === 200) {
              setAlert({show: true, mess: 'Yêu cầu đã được gửi'});
            } else {
              if (response.data.status === 500) {
                setAlert({show: true, mess: response.data.msg});
              } else {
                setAlert({show: true, mess: 'Đã xảy ra lỗi'});
              }
            }
            clearTimeout();
          },
          (error) => {
            setDisplay(false);
            setAlert({show: true, mess: '      Đã có lỗi xảy ra    '});
          },
        );
      setTimeout(() => {
        setDisplay(false);
      }, 5000);
    } else {
      Alert.alert('Vui lòng nhập đủ thông tin');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.rect2}>
        <Text style={styles.taoNhom}>Thêm hộ dân </Text>
        <Text style={styles.ten}>Tên hộ dân</Text>
        <View style={styles.rect6}>
          <TextInput
            style={styles.input}
            value={group.name}
            onChangeText={(text) => {
              setGroup({...group, name: text});
            }}></TextInput>
        </View>
        <Text style={styles.email}>Email</Text>
        <View style={styles.rect3}>
          <TextInput
            style={styles.input}
            value={group.email}
            onChangeText={(text) => {
              setGroup({...group, email: text});
            }}></TextInput>
        </View>
        <TouchableOpacity style={styles.rect5} onPress={handleSubmit}>
          <Text style={styles.xacNhan}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={display} textContent={'Loading...'} />
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
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rect2: {
    marginLeft: '5%',
    width: '90%',
    marginTop: '10%',
    marginBottom: '2%',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.44,
    shadowRadius: 0,
  },
  taoNhom: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 20,
    marginTop: '2%',
    marginLeft: '32%',
  },
  ten: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 18,
    marginTop: '4%',
    marginLeft: '5%',
  },
  rect6: {
    width: '80%',
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 17,
    marginTop: '4%',
    marginLeft: '5%',
  },
  email: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 18,
    marginLeft: '5%',
  },
  rect3: {
    width: '80%',
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 17,
    marginLeft: '5%',
  },
  matKhau: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 18,

    marginLeft: '5%',
  },
  rect4: {
    width: 273,
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 17,
    marginTop: 30,
    marginLeft: 15,
  },
  rect5: {
    width: 146,
    height: 36,
    backgroundColor: 'rgba(65,117,5,1)',
    borderRadius: 15,
    marginTop: 16,
    marginLeft: 28,
    marginBottom: '5%',
  },
  xacNhan: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginTop: 2,
    marginLeft: 39,
  },
  input: {
    fontFamily: 'Alata-Regular',
    fontSize: 18,
  },
});

export default AddHouseHold;
