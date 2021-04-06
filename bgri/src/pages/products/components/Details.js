import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {products} from 'src/redux/product/productSlice';
import axios from 'axios';
import {URL_YEU_CAU_VERIFY, URL_GET_ALL_INFO} from 'url';
import Spinner from 'react-native-loading-spinner-overlay';
import Chart from './Chart';
import QRCode from 'react-native-qrcode-generator';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
var ButtonStyle2 = {
  height: 50,
  marginTop: '2%',
  width: '90%',
  marginLeft: '5%',
  backgroundColor: '#36582f',
  borderRadius: 5,
  alignItems: 'center',
};

const DefaultInfo = (props) => {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState();
  const [trans, setTrans] = useState([]);
  const listProduct = useSelector(products);
  const [alert, setAlert] = useState({show: false, mess: ''});
  const route = useRoute();
  const address = listProduct[0].address_contract;
  const [display, setDisplay] = useState(true);
  const [display1, setDisplay1] = useState(false);
  const [statusMsg, setStatusMsg] = useState();
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 10000);
  }, []);
  useEffect(() => {
    axios
      .post(
        URL_GET_ALL_INFO,
        {
          address_contract: address,
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
          console.log(JSON.stringify(response.data));
          if (response.data.status === 200) {
            setData(response.data);
          }
          // setStatus('1');
          if (response.data.verify_contract === false) {
            setStatus('1');
          }
          setStatusMsg(response.data.status_msg);
        },
        (error) => {
          //console.log(error);
        },
      );
  }, []);
  useEffect(() => {
    var clone = trans;
    if (data) {
      if (data.resp_tx) {
        data.resp_tx.map((item) => {
          clone.push(item.updateAt);
        });
      }
    }
    setTrans(clone);
  }, [data]);
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
          type: 2,
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
        },
        (error) => {
          //console.log(error);
        },
      );
  };
  return (
    <View>
      {data ? (
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_info.name}</Text>
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
            <Text style={styles.thongTinSanPham}> {data.resp_dat.name}</Text>
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
            <Text style={styles.thongTinSanPham}> {data.resp_giong.name}</Text>
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
            <Text style={styles.thongTinSanPham}> {data.resp_nuoc.name}</Text>
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
          {data.resp_them ? (
            <View style={styles.rect}>
              <Text style={styles.thongTinSanPham}> {data.resp_them.name}</Text>
              {data.resp_them.data.map((contract, indexContract) => {
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
          ) : (
            <View />
          )}
          <View style={styles.rect}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Trạng thái mùa vụ</Text>
              <Text style={styles.thoiGian2}>
                {status === '1' ? 'Chưa được chấp nhận' : 'Đã được chấp nhận'}
              </Text>
            </View>
          </View>
          {data.resp_history.length > 0 ? (
            <View>
              <View style={styles.rect}>
                <Text style={styles.thongTinSanPham}> Danh sách hoạt động</Text>
                {data.resp_history.map((item, index) => {
                  if (index < data.resp_history.length - 1) {
                    return (
                      <View key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.thoiGian}>Thời gian</Text>
                          <Text style={styles.thoiGian}>
                            {item.time.slice(0, 10)}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.thoiGian}>Hành động</Text>
                          <Text style={styles.thoiGian}>
                            {item.action_name}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', borderBottomWidth: 2}}>
                          <Text style={styles.thoiGian}>Mô tả</Text>
                          <Text style={styles.thoiGian}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    );
                  } else {
                    return (
                      <View key={index}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.thoiGian}>Thời gian</Text>
                          <Text style={styles.thoiGian}>
                            {item.time.slice(0, 10)}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.thoiGian}>Hành động</Text>
                          <Text style={styles.thoiGian}>
                            {item.action_name}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.thoiGian}>Mô tả</Text>
                          <Text style={styles.thoiGian}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
              <View style={styles.rect}>
                <Text style={styles.thongTinSanPham}> Thông tin thêm</Text>
                {data.resp_custom.map((item, index) => {
                  if (index < data.resp_custom.length - 1) {
                    return (
                      <View key={index} style={{borderBottomWidth: 2}}>
                        {item.map((info, indexInfo) => {
                          return (
                            <View
                              style={{flexDirection: 'row'}}
                              key={indexInfo}>
                              <Text style={styles.thoiGian}>{info.name}</Text>
                              <Text style={styles.thoiGian}>{info.data}</Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  } else {
                    return (
                      <View key={index}>
                        {item.map((info, indexInfo) => {
                          return (
                            <View
                              style={{flexDirection: 'row'}}
                              key={indexInfo}>
                              <Text style={styles.thoiGian}>{info.name}</Text>
                              <Text style={styles.thoiGian}>
                                {info.data.slice(0, 10)}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          ) : (
            <View />
          )}
          {data.resp_tx.length > 0 ? (
            <View>
              <View style={styles.rect}>
                <Text style={styles.thongTinSanPham}> Thông tin giao dịch</Text>
                {data.resp_tx.map((tx, indexTx) => {
                  return (
                    <View style={{flexDirection: 'row'}} key={indexTx}>
                      <Text style={styles.thoiGian3}>
                        {tx.tx.slice(0, 30) + '...'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <View />
          )}
          <View style={{marginLeft: '5%'}}>
            <Chart trans={trans} />
          </View>

          <View style={styles.rect}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Trạng thái</Text>
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
          <View style={styles.rect}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.thoiGian}>Mùa vụ</Text>
              <Text style={styles.thoiGian2}>
                {data.end_smart_contract === false
                  ? 'Chưa kết thúc'
                  : 'Đã kết thúc'}
              </Text>
            </View>
          </View>
          {statusMsg === null || statusMsg === 3 ? (
            <View>
              <TouchableOpacity
                style={ButtonStyle2}
                onPress={handleYeuCauVerify}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#fff',
                    marginTop: 5,
                  }}>
                  Kết thúc mùa vụ
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
          {data.end_smart_contract === true ? (
            <View style={{marginTop: 40, alignItems: 'center'}}>
              <QRCode
                value={address}
                size={290}
                bgColor="black"
                fgColor="white"
              />
            </View>
          ) : (
            <View />
          )}
        </View>
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
    marginLeft: "5%",
    width: '40%',
  },
  thoiGian3: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    marginLeft: "5%",
    // width: '40%',
  },
  thoiGian2: {
    fontFamily: 'Alata-Regular',
    textAlign: 'right',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
  },
});
var ButtonStyle2 = {
  height: 50,
  marginTop: '2%',
  width: '90%',
  marginLeft: '5%',
  backgroundColor: '#36582f',
  borderRadius: 5,
  alignItems: 'center',
};
export default DefaultInfo;
