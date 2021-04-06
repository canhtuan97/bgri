import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import { URL_YEU_CAU_VERIFY, URL_GET_ALL_INFO} from 'url';
import Spinner from 'react-native-loading-spinner-overlay';
import Chart from 'src/pages/products/components/Chart';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';

const ResultSource = (props) => {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState();
  const [trans, setTrans] = useState([]);
  const [alert, setAlert] = useState({show: false, mess: ''});
  const address = props.keyQR;
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
 
  return (
    <ScrollView>
      {data ? (
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_info.name}</Text>
            {data.resp_info.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_dat.name}</Text>
            {data.resp_dat.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_giong.name}</Text>
            {data.resp_giong.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}> {data.resp_nuoc.name}</Text>
            {data.resp_nuoc.data.map((contract, indexContract) => {
              return (
                <View style={{flexDirection: 'row'}} key={indexContract}>
                  <Text style={styles.thoiGian}>{contract.name}</Text>
                  <Text style={styles.thoiGian2}>{contract.data}</Text>
                </View>
              );
            })}
          </View>
          {data.resp_them ? (
            <View style={styles.rect}>
              <Text style={styles.thongTinSanPham}> {data.resp_them.name}</Text>
              {data.resp_them.data.map((contract, indexContract) => {
                return (
                  <View style={{flexDirection: 'row'}} key={indexContract}>
                    <Text style={styles.thoiGian}>{contract.name}</Text>
                    <Text style={styles.thoiGian2}>{contract.data}</Text>
                  </View>
                );
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
                          <Text style={styles.thoiGian}>{item.time}</Text>
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
                          <Text style={styles.thoiGian}>{item.time}</Text>
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
                <Text style={styles.thongTinSanPham}> Lịch Sử Thêm</Text>
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
                              <Text style={styles.thoiGian}>{info.data}</Text>
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
                      <Text style={styles.thoiGian3}>{tx.tx.slice(0,30)+'...'}</Text>
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
              <Text style={styles.thoiGian}>Mùa vụ</Text>
              <Text style={styles.thoiGian2}>
                {data.end_smart_contract === false
                  ? 'Chưa kết thúc'
                  : 'Đã kết thúc'}
              </Text>
            </View>
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
          navigation.navigate('ProductHome');
        }}
      />
      <Spinner visible={display1} textContent={'Loading...'} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  rect: {
    width: '94%',
    backgroundColor: '#E6E6E6',
    borderRadius: 14,
    marginTop: '2%',
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
  thoiGian3: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
    marginLeft: 26,
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
export default ResultSource;
