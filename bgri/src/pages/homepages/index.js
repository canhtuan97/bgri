import React, {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import HomeFooter from './components/HomeFooter';
import HomeHeader from './components/HomeHeader';
import ProductAvt from './components/ListProduct';
import NetWork from './components/NetWork';
import Search from './components/Search';
import ListGroup from './components/ListGroup';
import AddGroup from './components/AddGroup';
import ListHouseHold from './components/ListHouseHold';
import GroupMenu from './components/GroupMenu';
import Messages from './components/Messages';
import VerifyProduct from './components/VerifyProduct';
import EndSeason from './components/EndSeason';
import {
  View,
  ScrollView,
  absolute,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import {user} from 'src/redux/user/userSlice';
import {useSelector} from 'react-redux';

var ContainerStyle = {
  paddingBottom: '5%',
  width: '100%',
};
export const HomePage3 = ({navigation}) => {
  const hardwareBackPressCustom = useCallback(() => {
    return true;
  }, []);
  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom,
      );
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                navigation.navigate('ListProduct');
              }}>
              <View style={styles.image2Row}>
                <Image
                  source={require('/images/icons/harvest.png')}
                  resizeMode="contain"
                  style={styles.image2}></Image>
                <Text style={styles.danhSachSanPham}>Danh sách mùa vụ</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
      <View style={QRStyle}>
        <Search />
      </View>
      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};

export const HomePage2 = ({navigation}) => {
  const hardwareBackPressCustom = useCallback(() => {
    return true;
  }, []);
  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom,
      );
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <GroupMenu />
          </ScrollView>
        </ImageBackground>
      </View>
      <View style={QRStyle}>
        <Search />
      </View>
      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const HomePage1 = ({navigation}) => {
  const hardwareBackPressCustom = useCallback(() => {
    return true;
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPressCustom);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hardwareBackPressCustom,
      );
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <NetWork />
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                navigation.navigate('ListProduct');
              }}>
              <View style={styles.image2Row}>
                <Image
                  source={require('/images/icons/harvest.png')}
                  resizeMode="contain"
                  style={styles.image2}></Image>
                <Text style={styles.danhSachSanPham}>Danh sách mùa vụ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                navigation.navigate('ListMessage');
              }}>
              <View style={styles.image2Row}>
                <Image
                  source={require('/images/message.png')}
                  resizeMode="contain"
                  style={styles.image2}></Image>
                <Text style={styles.danhSachSanPham}>Hòm thư</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
      <View style={QRStyle}>
        <Search />
      </View>
      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const HomePageListGroup = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ListGroup />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const HomePageAddGroup = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <AddGroup />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const HomePageListHouseHold = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={true} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ListHouseHold />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const HomePageListProduct = ({navigation}) => {
  const userInfo = useSelector(user);
  const [hiden, setHiden] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    if (userInfo[0].user.role === '2') {
      setHiden(false);
    } else {
      setHiden(true);
    }
  }, [userInfo]);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={hiden} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView
            style={ContainerStyle}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ProductAvt refresh={refreshing} />
          </ScrollView>
        </ImageBackground>
      </View>
      <View style={QRStyle}>
        <Search />
      </View>
      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const ListMessage = ({navigation}) => {
  const userInfo = useSelector(user);
  const [hiden, setHiden] = useState(true);
  useEffect(() => {
    if (userInfo[0].user.role === '2') {
      setHiden(false);
    } else {
      setHiden(true);
    }
  }, [userInfo]);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={hiden} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Messages />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
export const ProductVerify = ({navigation}) => {
  const userInfo = useSelector(user);
  const [hiden, setHiden] = useState(true);
  useEffect(() => {
    if (userInfo[0].user.role === '2') {
      setHiden(false);
    } else {
      setHiden(true);
    }
  }, [userInfo]);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={hiden} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <VerifyProduct />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 18, position: absolute}} />
    </View>
  );
};
export const ProductEndSeason = ({navigation}) => {
  const userInfo = useSelector(user);
  const [hiden, setHiden] = useState(true);
  useEffect(() => {
    if (userInfo[0].user.role === '2') {
      setHiden(false);
    } else {
      setHiden(true);
    }
  }, [userInfo]);
  return (
    <View style={{flex: 1}}>
      <HomeHeader style={{flex: 50}} hiden={hiden} />
      <View
        style={{
          flex: 100,
          width: '100%',
          marginTop: '3%',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={require('../../images/homepages/homepages3.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            justifyContent: 'center',
            position: absolute,
            backgroundAttachment: 'none',
            marginTop: '4%',
          }}>
          <ScrollView style={ContainerStyle}>
            <EndSeason />
          </ScrollView>
        </ImageBackground>
      </View>

      <HomeFooter style={{flex: 35, position: absolute}} />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 80,
    backgroundColor: 'rgba(183,183,81,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.69,
    shadowRadius: 0,
    flexDirection: 'row',
    marginLeft: '5%',
    marginBottom: '2%',
  },
  image: {
    width: 46,
    height: 43,
  },
  danhSachHoDan: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    marginLeft: 14,
    marginTop: 5,
  },
  imageRow: {
    height: 43,
    flexDirection: 'row',
    flex: 1,
    marginRight: '20%',
    marginLeft: 16,
    marginTop: 10,
  },
  button1: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.69,
    shadowRadius: 0,
    flexDirection: 'row',
    marginTop: '3%',
    marginLeft: '5%',
  },
  image2: {
    marginTop: '4%',
    width: 56,
    height: 56,
  },
  danhSachSanPham: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 26,
    marginLeft: 9,
    marginTop: 16,
  },
  image2Row: {
    flexDirection: 'row',
    flex: 1,
    marginRight: '20%',
    marginLeft: 16,
    marginTop: 9,
  },
});
var QRStyle = {
  marginLeft: '80%',
};
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
