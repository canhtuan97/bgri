import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
function NetWork() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ListGroup');
        }}>
        <View style={styles.imageRow}>
          <Image
            source={require('images/icons/network.png')}
            resizeMode="contain"
            style={styles.image}></Image>
          <Text style={styles.danhSachNhom}>Danh sách nhóm </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
  },
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
    marginTop: '3%',
    marginLeft: '5%',
  },
  image: {
    marginTop: '4%',
    width: 56,
    height: 56,
  },
  danhSachNhom: {
    fontFamily: 'Alata-Regular',
    color: '#000',
    fontSize: 26,
    marginLeft: 5,
    marginTop: 13,
  },
  imageRow: {
    // height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: '30%',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default NetWork;
