import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import AwesomeAlert from 'react-native-awesome-alerts';
import {URL_GET_TC_VIET_GAP, URL_DEPLOY_VIETGAP} from 'url';
import Spinner from 'react-native-loading-spinner-overlay';
import {LoadingsComponent} from 'constantsComponent';
import axios from 'axios';
function AddInfo(props) {
  const [page, setPage] = useState(0);
  const [alert, setAlert] = useState({show: false, mess: ''});
  const [display, setDisplay] = useState(true);
  const [display1, setDisplay1] = useState(false);
  const [dataInfo, setDataInfo] = useState(['']);
  const [alert2, setAlert2] = useState(false);
  const [extend, setExtend] = useState([{sku: 'time', name: 'Thời gian'}]);
  const [value, setValue] = useState({
    name: '',
    sku: '',
  });
  const navigation = useNavigation();
  const [vietGap, setVietGap] = useState();
  const userInfo = useSelector(user);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);

  const handleDeploy = () => {
    setDisplay1(true);
    setTimeout(() => {
      setDisplay1(false);
      setAlert({show: true, mess: '      Đang đợi xử lý, nhấn để quay lại   '});
    }, 5000);

    axios
      .post(
        URL_DEPLOY_VIETGAP,
        {
          address: userInfo[0].user.address,
          private_key: userInfo[0].user.private_key,
          data: extend,
          dataInfo: dataInfo,
        },
        {
          headers: headers,
        },
      )
      .then((response) => {
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
      })
      .catch((error) => {
        setDisplay1(false);
        setAlert({show: true, mess: '      Đã có lỗi xảy ra    '});
      });
  };
  useEffect(() => {
    axios
      .get(URL_GET_TC_VIET_GAP, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setVietGap(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);
  if (page === 0) {
    return (
      <>
        {vietGap ? (
          vietGap.map((item, index) => {
            if (item.status === 2 && index === 0) {
              return (
                <View key={index}>
                  <View style={styles.rect}>
                    <Text style={styles.thongTinSanPham}> {item.name}</Text>
                    {item.contract ? (
                      item.contract.map((contract, indexContract) => {
                        if (indexContract > 0) {
                          return (
                            <View
                              style={{flexDirection: 'row'}}
                              key={indexContract}>
                              <Text style={styles.thoiGian} key={indexContract}>
                                {contract.name}
                              </Text>
                              <TextInput
                                style={styles.thoiGian2}
                                onChangeText={(text) => {
                                  let clone = dataInfo.slice();
                                  clone[indexContract] = text;
                                  setDataInfo(clone);
                                }}></TextInput>
                            </View>
                          );
                        }
                      })
                    ) : (
                      <View />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.button12}
                    onPress={() => {
                      if (dataInfo.length === item.contract.length) {
                        setPage(1);
                      } else {
                        setAlert2(true);
                      }
                    }}>
                    <Text style={styles.themHoDan}>Tiếp</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })
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
          show={alert2}
          showProgress={true}
          title="Thông Báo"
          message="Vui lòng nhập đủ thông tin"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="     OK     "
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlert2(false);
          }}
        />
      </>
    );
  }
  if (page === 1) {
    return (
      <View>
        <View>
          {vietGap ? (
            vietGap.map((item, index) => {
              if (item.status === 2 && index > 0) {
                return (
                  <View key={index} style={styles.rect}>
                    <Text style={styles.thongTinSanPham}> {item.name}</Text>
                    {item.contract ? (
                      item.contract.map((contract, indexContract) => {
                        return (
                          <Text style={styles.thoiGian} key={indexContract}>
                            {contract.name}
                          </Text>
                        );
                      })
                    ) : (
                      <View />
                    )}
                  </View>
                );
              }
            })
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button11}
              onPress={() => setPage(0)}>
              <Text style={styles.themHoDan}>Trước</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button10}
              onPress={() => setPage(2)}>
              <Text style={styles.themHoDan}>Tiếp</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            navigation.navigate('ListProduct');
          }}
        />
        <Spinner visible={display1} textContent={'Loading...'} />
        {/* <Spinner visible={display} textContent={'Loading...'} /> */}
      </View>
    );
  }
  if (page === 2) {
    return (
      <View>
        <View>
          <View style={styles.rect}>
            <Text style={styles.thongTinSanPham}>Thông tin thêm</Text>
            {extend ? (
              extend.map((item, index) => {
                if (index > 0) {
                  return (
                    <View key={index} style={{flexDirection: 'row'}}>
                      <Text style={KeyStyle1}> {item.sku}</Text>
                      <Text style={KeyStyle2}> {item.name}</Text>
                    </View>
                  );
                }
              })
            ) : (
              <View />
            )}
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={InputStyle}
                value={value.sku}
                onChangeText={(text) => setValue({...value, sku: text})}
                placeholder="Kí hiệu"></TextInput>
              <TextInput
                style={InputStyle2}
                value={value.name}
                onChangeText={(text) => setValue({...value, name: text})}
                placeholder="Tên trường"></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={AddButtonStyle}
            onPress={() => {
              var cloneExtend = [...extend, value];
              setExtend(cloneExtend);
              setValue('');
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#898989',
                fontWeight: 'bold',
                marginTop: 8,
              }}>
              + Thêm thông tin
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button11}
              onPress={() => setPage(1)}>
              <Text style={styles.themHoDan}>Trước</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button10} onPress={handleDeploy}>
              <Text style={styles.themHoDan}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            navigation.navigate('ListProduct');
          }}
        />

        <Spinner visible={display1} textContent={'Loading...'} />
        {/* <Spinner visible={display} textContent={'Loading...'} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rect: {
    width: '90%',
    backgroundColor: '#E6E6E6',
    marginTop: '2%',
    marginLeft: '5%',
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
    fontSize: 20,
    marginTop: 7,
  },
  button10: {
    width: '40%',
    height: 50,
    marginBottom: '3%',
    marginLeft: '10%',
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
  button11: {
    width: '40%',
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
  button12: {
    width: '40%',
    height: 40,
    marginBottom: '3%',
    marginLeft: '55%',
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
    fontSize: 18,
    marginTop: '2%',
    marginLeft: '2%',
    width: '38%',
  },
  thoiGian2: {
    marginLeft: '5%',
    width: '48%',
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

var KeyStyle2 = {
  fontFamily: 'Alata-Regular',
  color: '#121212',
  fontSize: 18,
  width:'55%',
  marginLeft: '5%',
};
var KeyStyle1 = {
  width: '30%',
  fontFamily: 'Alata-Regular',
  color: '#121212',
  fontSize: 18,
  marginLeft: "2%",
};

var InputStyle = {
  backgroundColor: '#ffffff',
  fontSize: 18,
  color: '#000623',
  borderRadius: 5,
  marginLeft: "2%",
  // marginTop: '-15%',
  width: '30%',
  height: 50,
};
var InputStyle2 = {
  backgroundColor: '#ffffff',
  fontSize: 18,
  color: '#000623',
  borderRadius: 5,
  marginLeft: '7%',
  width: '55%',
  height: 50,
};
var ButtonStyle = {
  backgroundColor: '#FFA800',
  borderRadius: 10,
  alignItems: 'center',
  height: 50,
  marginTop: 10,
  width: '90%',
  marginLeft: 20,
};
var AddButtonStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  alignItems: 'center',
  height: 35,
  marginTop: 10,
  width: '90%',
  marginLeft: 20,
};
export default AddInfo;
