import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import { products} from 'src/redux/product/productSlice';
import axios from 'axios';
import {URL_GET_PRODUCT, URL_YEU_CAU_VERIFY} from 'url';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
var ButtonStyle = {
  height: 30,
  width: '35%',
  backgroundColor: '#FFA800',
  borderRadius: 5,
  marginLeft: '60%',
  alignItems: 'center',
};
var ButtonStyle2 = {
  height: 50,
  marginTop: '2%',
  width: '90%',
  marginLeft: '5%',
  backgroundColor: '#36582f',
  borderRadius: 5,
  alignItems: 'center',
};

const DefaultInfo = () => {
  const [alert, setAlert] = useState({show: false, mess: ''});
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState();
  const listProduct = useSelector(products);
  const [display, setDisplay] = useState(true);
  const [display1, setDisplay1] = useState(false);
  const [statusMsg, setStatusMsg] = useState();
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
          console.log(response.data);
          if (response.data.status === 200) {
            setData(response.data);
            if (response.data.verify_contract === false) {
              setStatus('1');
            }
            setStatusMsg(response.data.status_msg);
          }
        },
        (error) => {},
      );
  }, []);
  const renderButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={ButtonStyle}
          onPress={() => {
            navigation.navigate('ProductEdit', {
              id: route.params.id,
              name: route.params.name,
              type: 'edit_default_info',
            });
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
              marginTop: 5,
            }}>
            Chỉnh sửa
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const handleYeuCauVerify = () => {
    setDisplay1(true);
    setTimeout(() => {
      setDisplay1(false);
      setAlert({show: true, mess: '      Đã có lỗi xảy ra    '});
    }, 5000);
    axios
      .post(
        URL_YEU_CAU_VERIFY,
        {
          address_contract: address,
          type: 1,
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
        (error) => {},
      );
  };
  return (
    <View>
      {status === '1' ? renderButton() : <View />}
      {data ? (
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_info.name.replace("về ","")}</Text>
            {data.resp_info.data.map((contract, indexContract) => {
              if (indexContract > 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian}>{contract.data}</Text>
                  </View>
                );
              }
              if (indexContract === 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian}>
                      {contract.data.slice(0, 10)}
                    </Text>
                  </View>
                );
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
                    <Text style={styles.thoiGian}>{contract.data}</Text>
                  </View>
                );
              }
              if (indexContract === 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian}>
                      {contract.data.slice(0, 10)}
                    </Text>
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
                    <Text style={styles.thoiGian}>{contract.data}</Text>
                  </View>
                );
              }
              if (indexContract === 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian}>
                      {contract.data.slice(0, 10)}
                    </Text>
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
                    <Text style={styles.thoiGian}>{contract.data}</Text>
                  </View>
                );
              }
              if (indexContract === 0) {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian}>
                      {contract.data.slice(0, 10)}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_them.name.replace("về ","")}</Text>
            {data.resp_them.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian2}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}>
              {' '}
              {data.resp_history.name.replace("về","")}
            </Text>
            {data.resp_history.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian2}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rect}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Trạng thái mùa vụ</Text>
              <Text style={styles.thoiGian2}>
                {statusMsg === null
                  ? 'Chưa được xác nhận'
                  : statusMsg === 1
                  ? 'Đang đợi xác nhận'
                  : statusMsg === 2
                  ? 'Đã được xác nhận'
                  : statusMsg === 3
                  ? 'Đã bị từ chối'
                  : 'Không xác định'}
              </Text>
            </View>
          </View>
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
      {statusMsg === null || statusMsg === 3 ? (
        <View>
          <TouchableOpacity style={ButtonStyle2} onPress={handleYeuCauVerify}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 5,
              }}>
              Yêu cầu xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
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
    marginTop: '2%',
    marginLeft: '3%',
    paddingBottom: '2%',
  },
  
  tcVietGap: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    marginTop: '2%',
    marginLeft: '20%',
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
    marginLeft: "7%",
    width: '40%',
  },
  thoiGian2: {
    fontFamily: 'Alata-Regular',
    textAlign: 'right',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
  },
});
export default DefaultInfo;
