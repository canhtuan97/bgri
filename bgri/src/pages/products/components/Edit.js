import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {products} from 'src/redux/product/productSlice';
import axios from 'axios';
import {URL_GET_PRODUCT, URL_WRITE_LOG_PRODUCT} from 'url';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import {LoadingsComponent} from 'constantsComponent';
import DatePicker from 'react-native-datepicker';

var ButtonStyle = {
  backgroundColor: '#4A7729',
  borderRadius: 10,
  alignItems: 'center',
  height: 50,
  marginTop: 10,
  width: '90%',
  marginLeft: 20,
};

const DefaultInfo = (props) => {
  const [display, setDisplay] = useState(true);
  const [alert, setAlert] = useState({show: false, mess: ''});
  const [send, setSend] = useState({
    dataDat: [],
    dataNuoc: [],
    dataInfo: [],
    dataGiong: [],
  });
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const listProduct = useSelector(products);
  const [display1, setDisplay1] = useState(false);
  const route = useRoute();
  const address = listProduct[0].address_contract;
  const url = URL_GET_PRODUCT(address);
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
      .then(
        (response) => {
          if (response.data.status === 200) {
            setData(response.data);
          }
        },
        (error) => {
          //console.log(error);
        },
      );
  }, []);
  const handleSubmit = () => {
    if (
      send.dataDat.length === 4 &&
      send.dataInfo.length === 3 &&
      send.dataNuoc.length === 4 &&
      send.dataGiong.length === 3
    ) {
      setDisplay1(true);
      setTimeout(() => {
        setDisplay1(false);
        setAlert({show: true, mess: '     Đang đợi xử lý  '});
      }, 5000);
      axios
        .post(
          URL_WRITE_LOG_PRODUCT,
          {
            address_contract: address,
            dataDat: send.dataDat,
            dataInfo: send.dataInfo,
            dataNuoc: send.dataNuoc,
            dataGiong: send.dataGiong,
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
            console.log(response.data);
            if (response.data.status === 200) {
              setAlert({show: true, mess: 'Yêu cầu ghi thông tin đã được gửi'});
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
            setDisplay1(false);
            setAlert({show: true, mess: '      Đã có lỗi xảy ra    '});
          },
        );
    } else {
      Alert.alert('Vui lòng nhập đủ thông tin');
    }
  };
  const [date2, setDate2] = useState(new Date());
  const [date3, setDate3] = useState(new Date());
  return (
    <View>
      {data ? (
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_info.name.replace("về ","")}</Text>
            {data.resp_info.data.map((contract, indexContract) => {
              if (indexContract > 0) {
                if (indexContract === 0) {
                  return (
                    <View style={{flexDirection: 'row'}} key={indexContract}>
                      <Text style={styles.thoiGian}>{contract.name}</Text>
                      <DatePicker
                        style={styles.thoiGian2}
                        date={date2}
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {},
                          dateInput: {
                            borderWidth: 0,
                          },
                        }}
                        onDateChange={(date) => {
                          var clone = send;
                          clone.dataInfo[indexContract - 1] = date.toString;
                          setSend(clone);
                          setDate2(date);
                        }}></DatePicker>
                    </View>
                  );
                } else {
                  if (indexContract === 0) {
                    return (
                      <View style={{flexDirection: 'row'}} key={indexContract}>
                        <Text style={styles.thoiGian}>{contract.name}</Text>
                        <DatePicker
                          style={styles.thoiGian2}
                          date={date3}
                          format="DD-MM-YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {},
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                          onDateChange={(date) => {
                            var clone = send;
                            clone.dataInfo[indexContract - 1] = date.toString;
                            setSend(clone);
                            setDate3(date);
                          }}></DatePicker>
                      </View>
                    );
                  } else {
                    return (
                      <View style={{flexDirection: 'row'}} key={indexContract}>
                        <Text style={styles.thoiGian}>{contract.name}</Text>
                        <TextInput
                          style={styles.thoiGian2}
                          value={send.dataInfo[indexContract - 1]}
                          onChangeText={(text) => {
                            var clone = send;
                            clone.dataInfo[indexContract - 1] = text;
                            setSend(clone);
                          }}></TextInput>
                      </View>
                    );
                  }
                }
              }
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_dat.name.replace("về ","")}</Text>
            {data.resp_dat.data.map((contract, indexContract) => {
              if (indexContract > 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <TextInput
                      style={styles.thoiGian2}
                      value={send.dataDat[indexContract - 1]}
                      onChangeText={(text) => {
                        var clone = send;
                        clone.dataDat[indexContract - 1] = text;
                        setSend(clone);
                      }}></TextInput>
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_giong.name.replace("về ","")}</Text>
            {data.resp_giong.data.map((contract, indexContract) => {
              if (indexContract > 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <TextInput
                      style={styles.thoiGian2}
                      value={send.dataGiong[indexContract - 1]}
                      onChangeText={(text) => {
                        var clone = send;
                        clone.dataGiong[indexContract - 1] = text;
                        setSend(clone);
                      }}></TextInput>
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_nuoc.name.replace("về ","")}</Text>
            {data.resp_nuoc.data.map((contract, indexContract) => {
              if (indexContract > 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <TextInput
                      style={styles.thoiGian2}
                      value={send.dataNuoc[indexContract - 1]}
                      onChangeText={(text) => {
                        var clone = send;
                        clone.dataNuoc[indexContract - 1] = text;
                        setSend(clone);
                      }}></TextInput>
                  </View>
                );
              }
            })}
          </View>
          <TouchableOpacity style={ButtonStyle} onPress={handleSubmit}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginTop: 12,
              }}>
              LƯU THÔNG TIN
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {display ? (
            <LoadingsComponent display={display} />
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
        </View>
      )}
      <AwesomeAlert
        contentContainerStyle={{height: '20%', width: '90%'}}
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
          navigation.navigate('ProductHome');
        }}
      />
      <Spinner visible={display1} textContent={'Loading...'} />
    </View>
  );
};
const styles = StyleSheet.create({
  rect: {
    width: '94%',
    backgroundColor: '#E6E6E6',
    // borderRadius: 14,
    marginTop: '2%',
    marginLeft: '3%',
    paddingBottom: '2%',
  },
  custom: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    marginTop: '2%',
    marginLeft: '30%',
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
    marginLeft: '25%',
  },
  thoiGian: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    marginLeft: "5%",
    width: '40%',
  },
  thoiGian2: {
    marginLeft: '3%',
    width: '45%',
    height: 40,
    borderRadius: 10,
    fontFamily: 'Alata-Regular',
    textAlign: 'right',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    backgroundColor: 'white',
  },
});
export default DefaultInfo;
