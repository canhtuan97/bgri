import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function GroupMenu() {
  const navigation = useNavigation();
  
  return (
    <View style={{flex: 1, marginTop: '2%'}}>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          navigation.navigate('ListProduct')
        }}
        >
        <View style={styles.image2Row}>
          <Image
            source={require('/images/icons/harvest.png')}
            resizeMode="contain"
            style={styles.image2}></Image>
          <Text style={styles.danhSachSanPham}>Danh sách mùa vụ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 3,
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
  },
  image: {
    marginTop:'4%',
    width: 56,
    height: 56,
  },
  danhSachHoDan: {
    fontFamily: 'Alata-Regular',
    color: '#222020',
    fontSize: 25,
    marginLeft: 14,
    marginTop: 15,
  },
  imageRow: {
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
    borderRadius: 3,
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
    marginBottom: '1%',
    marginLeft: '5%',
  },
  image2: {
    marginTop:'4%',
    width: 56,
    height: 56,
  },
  danhSachSanPham: {
    fontFamily: 'Alata-Regular',
    color: '#111010',
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

export default GroupMenu;
