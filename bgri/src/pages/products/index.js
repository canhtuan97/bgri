import React from 'react';
import AddInfo from './components/CreateProduct';
import Edit from './components/Edit';
import Info from './components/Info';
import DefaultInfo from './components/DefaultInfo';
import ProductHeader from './components/ProductHeader';
import ProductFooter from './components/ProductFooter';
import Type from './components/Type';
import Menu from './components/Menu';
import Details from './components/Details';
import ListQRCode from './components/ListAction';
import AddQR from './components/AddAction';
import Action from './components/Action';
import ListFarmerMess from './components/ListFarmerMess';
import ActionFarmer from './components/ActionFarmer';
import AddHouseHold from './components/AddHouseHold';
import ListHouseHold from './components/ListHouseHold';

import {View, ScrollView, ImageBackground, absolute} from 'react-native';

var ContainerStyle = {
  width: '100%',
};

export const ProductHome = ({navigation, router}) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Menu />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const ProductInfo = (props) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Info />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const ProductDefaultInfo = (props) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <DefaultInfo />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductEdit = (props) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Edit />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const ProductDiary = (props) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Info />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const AddProduct = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <AddInfo />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const ProductType = (props) => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Type />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductDetails = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Details />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductQR = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ListQRCode />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductAddQR = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <AddQR />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductAction = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <Action />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductFarmerMess = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ListFarmerMess />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductFarmerAction = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ActionFarmer />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
export const ProductAddHouseHold = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <AddHouseHold />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};

export const ProductListHouseHold = () => {
  return (
    <View style={{flex: 1}}>
      <ProductHeader style={{flex: 50}} />
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
            marginTop: '0%',
          }}>
          <ScrollView style={ContainerStyle}>
            <ListHouseHold />
          </ScrollView>
        </ImageBackground>
      </View>
      <ProductFooter style={{flex: 25}} />
    </View>
  );
};
