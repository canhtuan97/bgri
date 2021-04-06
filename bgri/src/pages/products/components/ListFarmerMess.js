import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import {products} from 'src/redux/product/productSlice';
import {URL_GET_LIST_FARMER_MESS} from 'url';
import axios from 'axios';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
function ListFarmerMess(props) {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const listProduct = useSelector(products);
  const [display, setDisplay] = useState(true);
  const [data, setData] = useState(null);
  const route = useRoute();
  const address = listProduct[0].address_contract;
  const url = URL_GET_LIST_FARMER_MESS(address);
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
        console.log('day nay');
        console.log(response.data);
        if (response.data.status === 200) {
          setData(response.data.items);
        }
      });
  }, []);
  return (
    <View>
      {data ? (
        data.length === 0 ? (
          <Text style={styles.thongTinSanPham}>Chưa có yêu cầu nào</Text>
        ) : (
          <View />
        )
      ) : (
        <View />
      )}
      {data ? (
        data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.button2}
              key={index}
              onPress={() => {
                navigation.navigate('ProductFarmerAction', {
                  key: item.key_action,
                  id: route.params.id,
                });
              }}>
              <View style={styles.imageRow}>
                <Image
                  source={require('images/email.png')}
                  resizeMode="contain"
                  style={styles.image}></Image>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.nhom1}>Thông báo hoạt động</Text>
                  <Text style={styles.nhom2}>{item.updateAt.slice(0,10)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
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
    color: '#000',
    fontSize: 24,
    marginTop: 8,
    marginLeft: '20%',
  },
  button2: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    // borderRadius: 16,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.66,
    shadowRadius: 0,
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  image: {
    width: 57,
    height: 46,
    marginTop: '4%',
  },
  nhom1: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 24,
    marginLeft: "5%",
    marginTop: '0%',
  },
  nhom2: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 16,
    marginLeft: '5%',
  },
  nhom4: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginLeft: '-63%',
    marginTop: '6%',
  },
  nhom3: {
    fontFamily: 'Alata-Regular',
    color: '#fc0606',
    fontSize: 16,
    // marginLeft: '-50%',
    // marginTop: '6%',
  },
  imageRow: {
    // height: 46,
    flexDirection: 'row',
    flex: 1,
    marginRight: '0%',
    marginLeft: 12,
    marginTop: 9,
  },
  button: {
    width: 137,
    height: 35,
    backgroundColor: 'rgba(183,183,81,1)',
    borderRadius: 12,
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

export default ListFarmerMess;
