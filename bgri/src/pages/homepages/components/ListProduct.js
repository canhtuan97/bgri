import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setProducts} from 'src/redux/product/productSlice';
import {useNavigation} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import axios from 'axios';
import {URL_GET_LIST_PRODUCT, URL_DELETE_PRODUCT} from 'url';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import Menu, {MenuItem} from 'react-native-material-menu';


const ProductAvt = (props) => {
  const {refresh} = props;;
  const userInfo = useSelector(user);
  const [listProducts, setListProducts] = useState();
  const [alert, setAlert] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  useEffect(() => {
    if (refresh === true) {
      axios
        .get(URL_GET_LIST_PRODUCT, {
          headers: headers,
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.status === 200) {
            setListProducts(response.data.items);
          }
        });
    }
  }, [refresh]);
  useEffect(() => {
    axios
      .get(URL_GET_LIST_PRODUCT, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setListProducts(response.data.items);
        }
      });
  }, []);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, marginTop: '-2%', marginBottom: '2%'}}>
      {listProducts ? (
        listProducts.length === 0 ? (
          <AwesomeAlert
            contentContainerStyle={{height: '20%', width: '90%'}}
            show={alert}
            showProgress={false}
            title="Thông Báo"
            message="Hiện chưa có sản phẩm nào"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showConfirmButton={true}
            confirmText="     OK     "
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              setAlert(false);
            }}
          />
        ) : (
          <View />
        )
      ) : (
        <View />
      )}
      {listProducts ? (
        listProducts.map((item, index) => {
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
                contentContainerStyle={{height: '20%', width: '90%'}}
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
};
const MenuLongPress = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {item, index} = props;
  const menu = useRef();
  const userInfo = useSelector(user);
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo[0].access_token,
  };
  const [alert, setAlert] = useState({show: false, mess: ''});
  const deleteProduct = () => {
    axios
      .post(
        URL_DELETE_PRODUCT,
        {
          product_id: item._id,
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
        style={styles.rect}
        key={index}
        onPress={() => {
          dispatch(setProducts(item));
          navigation.navigate('ProductHome', {
            id: index,
            name: item.name,
          });
        }}
        onLongPress={showMenu}
        disabled={item.address_contract ? false : true}>
        <View style={styles.imageRow}>
          <Image
            source={require('images/products/Product2.png')}
            resizeMode="contain"
            style={styles.image}></Image>
          <View style={styles.nameColumn}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.loremIpsum}>
              {item.address_contract
                ? item.address_contract.slice(0, 20) + '...'
                : 'Đang đợi xử lý'}
            </Text>
            <Text style={styles.time}>
              {item.createAt.slice(8, 10) +
                '-' +
                item.createAt.slice(5, 8) +
                item.createAt.slice(0, 4)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Menu ref={menu} style={{marginLeft: '50%', width: '30%'}}>
        <MenuItem onPress={deleteProduct}>Xoá sản phẩm</MenuItem>
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
          setAlert({show: false, mess: ''});
          menu.current.hide()
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
  container: {
    flex: 1,
  },
  rect: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 0,
    shadowColor: 'rgba(16,125,125,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.46,
    shadowRadius: 0,
    marginTop: '5%',
    alignSelf: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius:35
  },
  name: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 22,
  },
  loremIpsum: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 16,
    marginTop: 4,
  },
  nameColumn: {
    width: '90%',
    marginLeft: 20,
    marginTop: '-3%',
  },
  time: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 16,
    marginTop: '0%',
  },
  imageRow: {
    height: 68,
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 9,
    marginRight: 5,
  },
});
export default ProductAvt;
