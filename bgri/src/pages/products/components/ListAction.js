import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {products} from 'src/redux/product/productSlice';
import axios from 'axios';
import {URL_GET_QR_CODE} from 'url';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
function ListQRCode(props) {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const listProduct = useSelector(products);
  const [alert, setAlert] = useState(true);

  const route = useRoute();
  const address = listProduct[0].address_contract;
  const url = URL_GET_QR_CODE(address);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfo[0].access_token,
        },
      })
      .then((response) => {
        console.log('QR CODE');
        console.log(response.data);
        if (response.data.status === 200) {
          setData(response.data);
        }
      });
  }, []);
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddQR', {
            address: address,
          });
        }}>
        <Text style={styles.taoNhom}>Tạo hoạt động</Text>
      </TouchableOpacity>
      {data ? (
        data.items.length === 0 ? (
          <AwesomeAlert
            contentContainerStyle={{height: '20%', width: '90%'}}
            show={alert}
            showProgress={false}
            title="Thông Báo"
            message="Hiện chưa có hoạt động nào"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showConfirmButton={true}
            confirmText="     OK     "
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setAlert(false);
            }}
          />
        ) : (
          <View />
        )
      ) : (
        <View />
      )}
      {data ? (
        data.items.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.rect2}
              onPress={() => {
                navigation.navigate('ProductAction', {
                  key: item.key,
                  address: address,
                });
              }}>
              <View style={styles.image2Row}>
                <Image
                  source={require('images/sprinkler.png')}
                  resizeMode="contain"
                  style={styles.image2}></Image>
                <View style={{flexDirection: 'column',marginTop:'-2%'}}>
                  <Text style={styles.time}>{item.action_name}</Text>
                  <Text style={styles.action}>{item.description}</Text>
                  <Text style={styles.mota}>{item.time.slice(0, 10)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View>
          {display ? (
            <View />
          ) : (
            <View>
              <AwesomeAlert
                show={true}
                showProgress={false}
                title="Thông Báo"
                message="Đã xảy ra lỗi, Vui lòng thử lại sau"
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
          )}
          <LoadingsComponent display={display} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  thongTinSanPham: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(213,96,37,1)',
    fontSize: 24,
    marginTop: 8,
    marginLeft: '20%',
  },
  rect2: {
    marginBottom: '1%',
    marginTop: '2%',
    width: '90%',
    height: 100,
    marginLeft: '5%',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.64,
    shadowRadius: 0,
  },
  time: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 20,
    marginLeft: '22%',
  },
  image2: {
    width: 54,
    height: 72,
  },
  action: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 20,
    marginLeft: '22%',
  },
  mota: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 20,
    marginLeft: '22%',
  },
  image2Row: {
    flexDirection: 'row',
    marginTop:'3%',
    marginLeft: '3%',
  },
  button: {
    width: 137,
    height: 35,
    backgroundColor: '#FFA800',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.66,
    shadowRadius: 0,
    marginTop: 0,
    marginLeft: '66%',
  },
  taoNhom: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginTop: 6,
    marginLeft: 16,
  },
});

export default ListQRCode;
