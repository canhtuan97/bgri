import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import {URL_SET_HISTORY, URL_GET_ACTIONS} from 'url';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {setProducts, products} from 'src/redux/product/productSlice';
const ResultHistory = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState();
  const [display, setDisplay] = useState(false);
  const [dataSend, setDataSend] = useState([]);
  const keyQR = props.keyQR;
  const userInfo = useSelector(user);
  const listProduct = useSelector(products);
  const address = listProduct[0].address_contract;
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  const getAction = URL_GET_ACTIONS(address, keyQR);

  useEffect(() => {
    axios
      .get(getAction, {
        headers,
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setData(response.data.data);
      });
  }, [props]);
  const handleSubmit = () => {
    setDisplay(true);

    if (dataSend.length === data.infoAdd.length - 1) {
      axios
        .post(
          URL_SET_HISTORY,
          {
            address_contract: address,
            key_qrcode: keyQR,
            data: dataSend,
          },
          {
            headers,
          },
        )
        .then((response) => {
          if (response.data.status === 200) {
            setTimeout(() => {
              navigation.navigate('ProductHome');
            }, 5000);
          }
          console.log(response.data);
        });
    } else {
      Alert.alert('Vui lòng nhập đủ thông tin');
    }
  };
  return (
    <ScrollView>
      {data ? (
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> Thông tin QR Code</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Thời gian</Text>
              <Text style={styles.thoiGian}>{data.time}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Hành động</Text>
              <Text style={styles.thoiGian}>{data.action_name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Mô tả</Text>
              <Text style={styles.thoiGian}>{data.description}</Text>
            </View>
          </View>
          {data.infoAdd ? (
            <View style={styles.rect}>
              <Text style={styles.thongTinSanPham}>Thông tin thêm</Text>
              {data.infoAdd.map((info, index) => {
                if (index > 0) {
                  return (
                    <View key={index} style={{flexDirection: 'row'}}>
                      <Text style={styles.thoiGian}>{info.name}</Text>
                      <TextInput
                        style={styles.thoiGian2}
                        value={dataSend[index - 1]}
                        onChangeText={(text) => {
                          var clone = dataSend;
                          dataSend[index - 1] = text;
                          setDataSend(clone);
                        }}></TextInput>
                    </View>
                  );
                }
              })}
              <TouchableOpacity style={styles.button10} onPress={handleSubmit}>
                <Text style={styles.themHoDan}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View />
      )}
      <Spinner visible={display} textContent={'Loading...'}></Spinner>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  rect: {
    width: '94%',
    backgroundColor: '#E6E6E6',
    borderRadius: 14,
    marginTop: '20%',
    marginLeft: '3%',
    paddingBottom: '2%',
  },
  button2: {
    width: 116,
    height: 35,
    backgroundColor: 'rgba(183,183,81,1)',
    borderRadius: 14,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.54,
    shadowRadius: 0,
    marginLeft: '10%',
  },
  tcVietGap: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    marginTop: '2%',
    marginLeft: '20%',
  },
  button: {
    width: 115,
    height: 35,
    backgroundColor: 'rgba(183,183,81,1)',
    borderRadius: 13,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.52,
    shadowRadius: 0,
    marginLeft: '20%',
  },
  custom: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    marginTop: '2%',
    marginLeft: '30%',
  },
  button2Row: {
    height: 35,
    flexDirection: 'row',
    marginTop: 23,
    marginLeft: 26,
    marginRight: 36,
  },
  loremIpsum: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 23,
    marginLeft: 58,
    fontSize: 20,
  },
  tieuDe: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: '5%',
    fontSize: 20,
  },
  rect2: {
    width: 1,
    height: 5,
    backgroundColor: '#E6E6E6',
    transform: [
      {
        rotate: '124.00deg',
      },
    ],
    marginLeft: 9,
  },
  tieuDeRow: {
    height: 5,
    flexDirection: 'row',
    marginTop: 28,
    marginLeft: 19,
    marginRight: 292,
  },
  ten: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 25,
    marginLeft: 43,
  },
  kiHieu: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 170,
  },
  themHoDan: {
    fontFamily: 'alata-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    marginTop: 7,
  },
  button10: {
    width: '90%',
    height: 50,
    marginBottom: '3%',
    marginLeft: '5%',
    marginTop: '3%',
    backgroundColor: 'rgba(183,183,81,1)',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.55,
    shadowRadius: 0,
    alignItems: 'center',
  },
  thongTinSanPham: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 24,
    marginTop: 8,
    marginLeft: '20%',
  },
  thoiGian: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    marginLeft: 26,
    width: '40%',
  },
  thoiGian2: {
    backgroundColor: '#fff',
    fontFamily: 'Alata-Regular',
    textAlign: 'right',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    width: '50%',
    borderRadius: 14,
  },
});
export default ResultHistory;
