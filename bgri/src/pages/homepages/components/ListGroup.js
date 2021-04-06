import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import {setGroups, groups} from 'src/redux/group';
import {URL_GET_LIST_GROUP, URL_DELETE_GROUP} from 'url';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import Menu, {MenuItem} from 'react-native-material-menu';
function ListGroup() {
  const listGroup = useSelector(groups);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  useEffect(() => {
    axios
      .get(URL_GET_LIST_GROUP, {
        headers: headers,
      })
      .then((response) => {
        dispatch(setGroups(response.data.items));
      })
      .catch((error) => {});
  }, [userInfo[0].access_token]);

  return (
    <View style={{flex: 1, marginTop: '2%'}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddGroup');
        }}>
        <Text style={styles.taoNhom}> + Tạo nhóm</Text>
      </TouchableOpacity>
      {listGroup[0] ? (
        listGroup[0].length === 0 ? (
          <Text style={styles.thongTinSanPham}>Hiện chưa có nhóm nào</Text>
        ) : (
          <View />
        )
      ) : (
        <View />
      )}
      {listGroup[0] ? (
        listGroup[0].map((item, index) => {
          return (
            <View key={index}>
              <MenuLongPress item={item} />
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
  const {item} = props;
  const userInfo = useSelector(user);
  const menu = useRef();
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  const [alert, setAlert] = useState({show: false, mess: ''});
  const deleteGroup = () => {
    axios
      .post(
        URL_DELETE_GROUP,
        {
          group_id: item._id,
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          navigation.navigate('ListHouseHold', {
            id: item._id,
            role: '1',
          });
        }}
        onLongPress={showMenu}>
        <View style={styles.imageRow}>
          <Image
            source={require('images/icons/groups.png')}
            resizeMode="contain"
            style={styles.image}></Image>
          <Text style={styles.nhom1}>{item.name}</Text>
          <Text style={styles.nhom2}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <Menu ref={menu} style={{marginLeft: '50%', width: '30%'}}>
        <MenuItem onPress={deleteGroup}>Xoá nhóm</MenuItem>
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
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.66,
    shadowRadius: 0,
    // flexDirection: 'row',
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
    fontSize: 26,
    marginLeft: '20%',
    marginTop: '-15%',
  },
  nhom2: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 16,
    marginLeft: '20%',
    // marginTop: '6%',
  },
  imageRow: {
    height: 46,
    // flexDirection: 'row',
    flex: 1,
    marginRight: '0%',
    marginLeft: 12,
    marginTop: 9,
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
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    marginLeft: 16,
  },
});

export default ListGroup;
