import React, {useState} from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Email from './Email';
import Separator from './Separator';
import Tel from './Tel';
import Balance from './Balance';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useSelector, useDispatch} from 'react-redux';
import {user} from 'src/redux/user/userSlice';
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});
var ButtonStyle = {
  backgroundColor: '#60a5dd',
  borderRadius: 10,
  alignItems: 'center',
  height: 50,
  marginTop: 10,
  width: '90%',
  marginLeft: 20,
};
const Contact = () => {
  const [alert, setAlert] = useState(false);
  const userInfo = useSelector(user);
  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require('images/profile/background.jpg')}>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('images/profile/man.png')}
            />
            <Text style={styles.userNameText}>{userInfo[0].user.name}</Text>
            <View style={styles.userAddressRow}>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderTel = () => {
    return (
      <View style={styles.telContainer}>
        <Tel />
      </View>
    );
  };

  renderEmail = () => {
    return (
      <View style={styles.emailContainer}>
        <Email />
      </View>
    );
  };
  renderBalance = () => {
    return (
      <View style={styles.emailContainer}>
        <Balance />
      </View>
    );
  };
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {renderHeader()}
          {renderTel()}
          {Separator()}
          {renderEmail()}
          {Separator()}
          {renderBalance()}
        </Card>
      </View>
      <TouchableOpacity
        style={ButtonStyle}
        onPress={() => {
          setAlert(true)
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          ĐĂNG XUẤT
        </Text>
      </TouchableOpacity>
      <AwesomeAlert
        contentContainerStyle={{height: '20%',width:'90%'}}
        show={alert}
        showProgress={false}
        title="Thông Báo"
        message="Bạn có chắc chắn muốn đăng xuất"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="     OK     "
        showCancelButton={true}
        cancelText="   Huỷ    "
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          navigation.navigate("Signin");
        }}
        onCancelPressed={() => {
          setAlert(false)
        }}
      />
    </ScrollView>
  );
};

export default Contact;
