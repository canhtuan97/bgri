import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';
const Menu = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState();
  const route = useRoute();
  const userInfo = useSelector(user);
  useEffect(() => {
    setRole(userInfo[0].user.role);
  }, [userInfo]);

  if (role === '3') {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductFarmerMess', {
              id: route.params.id,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/message.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thông báo</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if (role === '2') {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDefaultInfo', {
              id: route.params.id,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/setup.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thiết lập</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDiary', {
              id: route.params.id,
              name: route.params.name,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/lich_su.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Nhật ký</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductQR', {
              id: route.params.id,
              name: route.params.name,
              type: 'edit_extend_info',
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/sprinkler.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Hoạt động</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              id: route.params.id,
              name: route.params.name,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/analytics.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thống kê</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ListHouseHold', {
              id: userInfo[0].user._id,
              role: '2',
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/icons/agricultural.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Danh sách hộ dân</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductAddHouseHold', {
              id: route.params.id,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/add-user.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thêm hộ dân</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if (role === '1') {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDefaultInfo', {
              id: route.params.id,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/setup.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thiết lập</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDiary', {
              id: route.params.id,
              name: route.params.name,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/lich_su.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Nhật ký</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rect3}
          onPress={() => {
            navigation.navigate('ProductDetails', {
              id: route.params.id,
              name: route.params.name,
            });
          }}>
          <View style={styles.image2Row}>
            <Image
              source={require('images/analytics.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
            <Text style={styles.caiDat}>Thống kê</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={{flex: 1}}></View>;
};
const styles = StyleSheet.create({
  container: {
    width: 303,
    height: 84,
  },
  rect3: {
    marginTop: '2%',
    marginLeft: '5%',
    marginBottom: '2%',
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.59,
    shadowRadius: 0,
    flexDirection: 'row',
  },
  image2: {
    marginTop: '2%',
    width: 60,
    height: 56,
  },
  caiDat: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 26,
    marginLeft: 16,
    marginTop: 12,
  },
  image2Row: {
    height: 56,
    flexDirection: 'row',
    flex: 1,
    marginRight: '20%',
    marginLeft: 14,
    marginTop: 14,
  },
});
export default Menu;
