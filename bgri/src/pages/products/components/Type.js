import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {generateShadow} from 'react-native-shadow-generator';

const DATA_ANIMAL = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Chó',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Mèo',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Lợn',
  },
  {
    id: '1',
    title: 'test',
  },
  {
    id: '2',
    title: 'test',
  },
  {
    id: '3',
    title: 'test',
  },
  {
    id: '4',
    title: 'test',
  },
  {
    id: '5',
    title: 'test',
  },
  {
    id: '6',
    title: 'test',
  },
  {
    id: '7',
    title: 'test',
  },
  {
    id: '8',
    title: 'test',
  },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '90%',
    height: 120,
    marginTop: '4%',
    marginLeft: '5%',
    backgroundColor: '#cce6ff',
    ...generateShadow(5),
    borderRadius: 10,
  },
  images: {
    width: 70,
    height: 70,
    marginTop: '5%',
  },
  title: {
    fontSize: 18,
    color: '#000623',
    marginLeft: '18%',
    marginTop: '-20%',
  },
  detail: {
    fontSize: 12,
    color: '#000623',
    marginLeft: '18%',
    marginTop: '1%',
    marginRight: '3%',
  },
  type: {
    height: 50,
    width: '90%',
    borderColor: '#FFA800',
    borderWidth: 2,
    borderRadius: 25,
    marginTop: 15,
    marginLeft: 10,
  },
  rect4: {
    marginTop: '2%',
    marginBottom: '2%',
    width: '90%',
    marginLeft: '4%',
    height: 149,
    backgroundColor: 'rgba(152,227,127,1)',
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,1)',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cayNgo: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 22,
    marginTop: 5,
    marginLeft: 77,
  },
  image3: {
    width: 73,
    height: 114,
    marginTop: '-2%',
  },
  loremIpsum2: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16,
    marginLeft: 3,
    marginTop: 32,
  },
  image3Row: {
    height: 114,
    flexDirection: 'row',
    marginTop: '-4%',
    marginLeft: 2,
    marginRight: '20%',
  },
});

const Item = ({title, description, img}) => (
  <View style={styles.rect4}>
    <Text style={styles.cayNgo}>{title}</Text>
    <View style={styles.image3Row}>
      <Image source={img} resizeMode="contain" style={styles.image3}></Image>
      <Text style={styles.loremIpsum2}>{description}</Text>
    </View>
  </View>
);

const Type = (props) => {
  const [page, setPage] = useState('');
  if (page === '') {
    return (
      <View style={{flex: 1}}>
        <View>
          <TouchableOpacity
            style={s.container}
            onPress={() => {
              setPage('plant');
            }}>
            <View >
              <ImageBackground
                source={require('images/addproduct/cay_trong.jpg')}
                resizeMode="contain"
                style={s.image}
                imageStyle={s.image_imageStyle}>
                <Text style={s.cayTrồng}>Cây trồng</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.container}
            onPress={() => {
              setPage('animal');
            }}>
            <View >
              <ImageBackground
                source={require('images/addproduct/vat_nuoi.jpg')}
                resizeMode="contain"
                style={s.image}
                imageStyle={s.image_imageStyle}>
                <Text style={s.cayTrồng}>Vật nuôi</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    if (page === 'animal') {
      return <ListType type="animal" />;
    } else {
      return <ListType type="plant"></ListType>;
    }
  }
};
const ListType = (props) => {
  const navigation = useNavigation();
  const {type} = props;
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AddProduct', {
          name: item.title,
        })
      }>
      <Item title={item.title} description={item.description} img={item.img} />
    </TouchableOpacity>
  );
  if (type === 'animal') {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA_ANIMAL}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA_PLANTS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
};

const s = StyleSheet.create({
  container: {
    width: "90%",
    height: 153,
    marginLeft: "5%",
  },
  image: {
    width: "100%",
    height: 153,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image_imageStyle: {},
  cayTrồng: {
    fontFamily: 'Alata-Regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 45,
    marginTop: 46,
    marginLeft: "27%",
  },
});
export default Type;
