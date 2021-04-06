import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {user} from 'src/redux/user/userSlice';
import {URL_SCAN_ADDRESS_ETH} from 'url';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'darkgray',
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: 'gray',
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '-8%',
  },
});

const Tel = ({containerStyle}) => {
  const userInfo = useSelector(user);
  console.log(userInfo[0]);
  var url = URL_SCAN_ADDRESS_ETH + userInfo[0].address;
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.iconRow}>
          <Image
            style={{height: 55, width: 55, marginLeft: 10}}
            source={require('images/profile/address.png')}
          />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>ADDRESS</Text>
          </View>
          <View style={styles.telNameColumn}>
            <Text style={styles.telNameText}>{userInfo[0].user.address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tel;
