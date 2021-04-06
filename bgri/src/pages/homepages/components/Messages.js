import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import {setGroups, groups} from 'src/redux/group';
import {URL_GET_LIST_GROUP, URL_GET_LIST_MESSAGES} from 'url';
import axios from 'axios';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {URL_DELETE_MSG} from '../../../config/url';

function Messages(props) {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [display, setDisplay] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);
  useEffect(() => {
    axios
      .get(URL_GET_LIST_MESSAGES, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfo[0].access_token,
        },
      })
      .then((response) => {
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
            <View key={index}>
              <MenuLongPress item={item} index={index} />
            </View>
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
const MenuLongPress = (props) => {
  const navigation = useNavigation();
  const {item, index} = props;
  console.log(item);
  const menu = useRef();
  const userInfo = useSelector(user);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  const [alert, setAlert] = useState({show: false, mess: ''});
  const deleteMsg = () => {
    axios
      .post(
        URL_DELETE_MSG,
        {
          msg_id: item._id,
        },
        {
          headers: headers,
        },
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setAlert({show: true, mess: 'Xoá thành công'});
        } else {
          if (response.data.status === 500) {
            setAlert({show: true, mess: response.data.msg});
          } else {
            setAlert({show: true, mess: 'Đã xảy ra lỗi'});
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showMenu = () => menu.current.show();
  return (
    <View>
      {item.type === '1' ? (
        <TouchableOpacity
          style={styles.button2}
          key={index}
          onPress={() => {
            navigation.navigate('ProductVerify', {
              address: item.address_contract,
              id: item.contract_id,
              mess_id: item._id,
            });
          }}
          onLongPress={showMenu}
          disabled={item.status === 1 ? false : true}>
          <View style={styles.imageRow}>
            <Image
              source={require('images/email.png')}
              resizeMode="contain"
              style={styles.image}></Image>
            <View style={{flexDirection: 'column',width: '70%',}}>
              <Text style={styles.nhom1}>Thiết lập mùa vụ</Text>
              <Text style={styles.nhom2}>{item.updateAt.slice(0, 10)}</Text>
              <Text style={styles.nhom2}>{"Gửi từ: " + item.user_id}</Text>
            </View>
            {item.status === 3 ? (
              <View style={styles.nhom3}>
                <Image
                  source={require('images/icons/false.png')}
                  resizeMode="contain"
                  style={styles.nhom3}></Image>
              </View>
            ) : item.status === 2 ? (
              <View style={styles.nhom3}>
                <Image
                  source={require('images/icons/true.png')}
                  resizeMode="contain"
                  style={styles.nhom3}></Image>
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {item.type === '2' ? (
        <TouchableOpacity
          style={styles.button2}
          key={index}
          onPress={() => {
            navigation.navigate('ProductEndSeason', {
              address: item.address_contract,
              id: item.contract_id,
              mess_id: item._id,
            });
          }}
          onLongPress={showMenu}
          disabled={item.status === 1 ? false : true}>
          <View style={styles.imageRow}>
            <Image
              source={require('images/email.png')}
              resizeMode="contain"
              style={styles.image}></Image>
            <View style={{flexDirection: 'column',width: '70%',}}>
              <Text style={styles.nhom1}>Kết thúc mùa vụ</Text>
              <Text style={styles.nhom4}>{item.updateAt.slice(0, 10)}</Text>
              <Text style={styles.nhom2}>{"Gửi từ: " + item.user_id}</Text>
            </View>
            {item.status === 3 ? (
              <View style={styles.nhom3}>
                <Image
                  source={require('images/icons/false.png')}
                  resizeMode="contain"
                  style={styles.nhom3}></Image>
              </View>
            ) : item.status === 2 ? (
              <View style={styles.nhom3}>
                <Image
                  source={require('images/icons/true.png')}
                  resizeMode="contain"
                  style={styles.nhom3}></Image>
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <Menu ref={menu} style={{marginLeft: '50%', width: '30%'}}>
        <MenuItem onPress={deleteMsg}>Xoá thông báo</MenuItem>
      </Menu>
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
          navigation.navigate('HomePage1');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button2: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
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
    marginLeft: '5%',
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
    color: '#000',
    fontSize: 16,
    marginLeft: '5%',
  },
  nhom3: {
    width: 40,
    height: 40,
  },
  imageRow: {
    flexDirection: 'row',
    flex: 1,
    marginRight: '0%',
    marginLeft: 12,
    marginTop: 9,
  },
  button: {
    width: 137,
    height: 35,
    backgroundColor: '#fff',
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
  thongTinSanPham: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(213,96,37,1)',
    fontSize: 24,
    marginTop: 8,
    marginLeft: '20%',
  },
});

export default Messages;
