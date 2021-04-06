import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {URL_MSG_ACTION, URL_SET_HISTORY, URL_GET_ACTIONS} from 'url';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';

function Action() {
  const [alert, setAlert] = useState({show: false, mess: ''});
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const route = useRoute();
  const address = route.params.address;
  const key = route.params.key;
  const [display1, setDisplay1] = useState(false);
  const [display, setDisplay] = useState(true);
  const [change, setChange] = useState(false);
  const urlGetAction = URL_GET_ACTIONS(address, key);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [change]);
  useEffect(() => {
    axios
      .get(urlGetAction, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfo[0].access_token,
        },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status === 200) {
          setData(response.data.data);
        }
      });
  }, [change]);

  return (
    <View>
      {data ? (
        <View>
          <Text style={styles.thongTinSanPham}>Thông tin hành động </Text>
          <View style={styles.rect}>
            <Text style={styles.thoiGian}>{data.time.slice(0, 10)}</Text>
            <Text style={styles.thoiGian}>{data.action_name}</Text>
            <Text style={styles.thoiGian}>{data.description}</Text>
          </View>
          <Text style={styles.thongTinSanPham}>Danh sách thực hiện </Text>
          {data.msg_action.map((msg, index) => (
            <View style={styles.rect} key={index}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.thoiGian2}>{msg.user_id_household}</Text>
                <Text style={styles.thoiGian2}>
                  {msg.status === 1
                    ? 'Đã thực hiện'
                    : msg.status === 0
                    ? 'Chưa thực hiện'
                    : msg.status === 3
                    ? 'Đã từ chối'
                    : msg.status === 2
                    ? 'Đã chấp nhận'
                    : 'Không xác định'}
                </Text>
              </View>

              {data.infoAdd.map((info, indexInfo) => {
                if (indexInfo > 0) {
                  return (
                    <View style={{flexDirection: 'row'}} key={indexInfo}>
                      <Text style={styles.thoiGian2}>{info.name}</Text>
                      <Text style={styles.thoiGian2}>
                        {msg.data ? msg.data[indexInfo - 1] : ''}
                      </Text>
                    </View>
                  );
                }
              })}
              {msg.status === 1 || msg.status === 3 ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={ButtonStyle2}
                    onPress={() => {
                      setDisplay1(true);
                      axios
                        .post(
                          URL_SET_HISTORY,
                          {
                            address_contract: address,
                            msg_action_id: msg._id,
                            key_qrcode: msg.key_action,
                            data: msg.data,
                            status: 2,
                          },
                          {
                            headers: {
                              'Content-Type': 'application/json',
                              'x-access-token': userInfo[0].access_token,
                            },
                          },
                        )
                        .then((response) => {
                          setChange(!change);
                        })
                        .catch((err) => {
                          setChange(!change);
                        });
                      // navigation.navigate("ProductAction");
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#fff',
                        marginTop: 5,
                      }}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={ButtonStyle2}
                    onPress={() => {
                      setDisplay1(true);
                      axios
                        .post(
                          URL_MSG_ACTION,
                          {
                            address_contract: address,
                            msg_action_id: msg._id,
                            status: 3,
                          },
                          {
                            headers: {
                              'Content-Type': 'application/json',
                              'x-access-token': userInfo[0].access_token,
                            },
                          },
                        )
                        .then((response) => {
                          setChange(!change);
                        })
                        .catch((err) => {
                          setChange(!change);
                        });
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#fff',
                        marginTop: 5,
                      }}>
                      Từ chối
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>
          ))}
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
          <Spinner visible={display1} textContent={'Loading...'}></Spinner>
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
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
}
var ButtonStyle2 = {
  height: 40,
  marginTop: '2%',
  width: '40%',
  marginLeft: '5%',
  backgroundColor: '#36582f',
  borderRadius: 5,
  alignItems: 'center',
};
const styles = StyleSheet.create({
  thoiGian: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 20,
    marginTop: '2%',
    marginLeft: 26,
    // width: '40%',
  },
  thoiGian2: {
    fontFamily: 'Alata-Regular',
    color: '#121212',
    fontSize: 20,
    marginTop: '2%',
    marginLeft: '2%',
    width: '45%',
  },
  thongTinSanPham: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 24,
    marginTop: 8,
    marginLeft: '20%',
  },
  rect2: {
    marginTop: '2%',
    width: '90%',
    height: 100,
    marginLeft: '5%',
    backgroundColor: 'rgba(183,183,81,1)',
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
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginLeft: '20%',
    paddingLeft: '5%',
  },
  image2: {
    width: 54,
    height: 72,
  },
  action: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: '-12%',
    marginLeft: '22%',
  },
  mota: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 20,

    marginLeft: '22%',
  },
  image2Row: {
    marginTop: '-5%',
    marginLeft: '3%',
  },
  button: {
    width: 137,
    height: 35,
    backgroundColor: 'rgba(183,183,81,1)',
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
  rect: {
    width: '94%',
    backgroundColor: '#E6E6E6',
    marginTop: '2%',
    marginLeft: '3%',
    paddingBottom: '2%',
  },
});

export default Action;
