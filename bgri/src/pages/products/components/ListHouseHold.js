import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import { products} from 'src/redux/product/productSlice';
import {URL_GET_LIST_HOUSEHOLDS, URL_DELETE_HOUSEHOLD} from 'url';
import axios from 'axios';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import Menu, {MenuItem} from 'react-native-material-menu';
function ListGroup(props) {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [listHouseHold, setListHouseHold] = useState();
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const route = useRoute();
  const id = route.params.id;
  const product = useSelector(products);
  const contact = product[0]._id;
  const [display1, setDisplay1] = useState(true);
  const url = URL_GET_LIST_HOUSEHOLDS(id, contact);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay1(false);
    }, 5000);
  }, []);
  useEffect(() => {
    axios
      .get(url, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setListHouseHold(response.data.items);
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }, [userInfo[0].access_token]);
  useEffect(() => {
    if (route.params.role === '1') {
      setDisplay(false);
    }
    if (route.params.role === '2') {
      setDisplay(true);
    }
  }, []);
  return (
    <View style={{flex: 1, marginTop: '2%'}}>
      {listHouseHold ? (
        listHouseHold.length === 0 ? (
          <Text style={styles.thongTinSanPham}>Không có hộ dân nào </Text>
        ) : (
          <View />
        )
      ) : (
        <View />
      )}
      {listHouseHold ? (
        listHouseHold.map((item, index) => {
          return (
            <View key={index}>
              <MenuLongPress item={item} />
            </View>
          );
        })
      ) : (
        <View>
          {display1 ? (
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
          <LoadingsComponent display={display1} />
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
  const deleteHouseHold = () => {
    axios
      .post(
        URL_DELETE_HOUSEHOLD,
        {
          household_id: item._id,
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
      <TouchableOpacity style={styles.button2} onLongPress={showMenu}>
        <View style={styles.imageRow}>
          <Image
            source={require('images/icons/farmer.png')}
            resizeMode="contain"
            style={styles.image}></Image>
          <Text style={styles.nhom1}>{item.name}</Text>
          <Text style={styles.nhom2}>{item.email}</Text>
        </View>
      </TouchableOpacity>
      <Menu ref={menu} style={{marginLeft: '50%', width: '30%'}}>
        <MenuItem onPress={deleteHouseHold}>Xoá hộ dân</MenuItem>
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
          navigation.goBack();
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
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  image: {
    marginTop: '2%',
    width: 56,
    height: 56,
  },
  nhom1: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 24,
    marginLeft: 21,
    marginTop: '-15%',
    marginLeft: '19%',
  },
  nhom2: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 18,
    marginLeft: '19%',
    marginTop: '2%',
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
});

export default ListGroup;
