import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {products} from 'src/redux/product/productSlice';
import {URL_GET_HISTORY} from 'url';
import {LoadingsComponent} from 'constantsComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
const Info = () => {
  const navigation = useNavigation();
  const userInfo = useSelector(user);
  const [data, setData] = useState(null);
  const listProduct = useSelector(products);
  const route = useRoute();
  const address = listProduct[0].address_contract;
  const url = URL_GET_HISTORY(address);
  const [display, setDisplay] = useState(true);
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
          console.log(JSON.stringify(response.data));
          if (response.data.status === 200) {
            setData(response.data);
          }
        },
        (error) => {
          //console.log(error);
        },
      );
  }, []);

  return (
    <View style={{flex: 1}}>
      {data ? (
        <View>
          <View style={styles.rect}>
            {data ? (
              data.data.length === 0 ? (
                <Text style={styles.thongTinSanPham}>Chưa có lịch sử</Text>
              ) : (
                <Text style={styles.thongTinSanPham}> Danh sách hoạt động</Text>
              )
            ) : (
              <View />
            )}
            {data.data.map((item, index) => {
              if (index < data.data.length - 1) {
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
                      <Text style={styles.thoiGian}>{item.action_name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', borderBottomWidth: 2}}>
                      <Text style={styles.thoiGian}>Mô tả</Text>
                      <Text style={styles.thoiGian}>{item.description}</Text>
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
                      <Text style={styles.thoiGian}>{item.action_name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.thoiGian}>Mô tả</Text>
                      <Text style={styles.thoiGian}>{item.description}</Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
          <View style={styles.rect}>
            {data ? (
              data.itemsAdd.length === 0 ? (
                <View />
              ) : (
                <Text style={styles.thongTinSanPham}> Thông tin thêm</Text>
              )
            ) : (
              <View />
            )}

            {data.itemsAdd.map((item, index) => {
              if (index < data.data.length - 1) {
                return (
                  <View key={index} style={{borderBottomWidth: 2}}>
                    {item.map((info, indexInfo) => {
                      return (
                        <View style={{flexDirection: 'row'}} key={indexInfo}>
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
                        <View style={{flexDirection: 'row'}} key={indexInfo}>
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
};
const styles = StyleSheet.create({
  rect: {
    width: '94%',
    backgroundColor: '#E6E6E6',
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
  thoiGian2: {
    fontFamily: 'Alata-Regular',
    textAlign: 'right',
    color: '#121212',
    fontSize: 16,
    marginTop: '2%',
  },
});
export default Info;
