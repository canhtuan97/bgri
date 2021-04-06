
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {headerLeft} from '@react-navigation/native'
import {
  HomePage3,
  HomePage1,
  HomePage2,
  ProductHome,
  ProductInfo,
  ProductEdit,
  ProductDiary,
  AddProduct,
  ProductType,
  ProductDefaultInfo,
  ProfileScreen,
  ProductDetails,
  Signin,
  Intro,
  Signup,
  WriteHistory,
  HomePageListGroup,
  HomePageAddGroup,
  HomePageListHouseHold,
  HomePageListProduct,
  ProductQR, 
  ProductAddQR,
  ListMessage,
  ProductVerify,
  ProductEndSeason,
  FindSourceProduct,
  ProductAction,
  ProductFarmerMess,
  ProductFarmerAction,
  ProductAddHouseHold, 
  ProductListHouseHold
} from './src/pages';

const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="Intro" headerMode='none'> 
          <Stack.Screen name="ProfileScreen" component={ ProfileScreen} />
          <Stack.Screen name="HomePage2" component={HomePage2}/>
          <Stack.Screen name="HomePage3" component={HomePage3}/>
          <Stack.Screen name="WriteHistory" component={WriteHistory}/>
          <Stack.Screen name="ProductQR" component={ProductQR}/>
          <Stack.Screen name="ProductFarmerAction" component={ProductFarmerAction}/>
          <Stack.Screen name="Signin" component={Signin}/>
          <Stack.Screen name="ProductAddHouseHold" component={ProductAddHouseHold}/>
          <Stack.Screen name="ProductFarmerMess" component={ProductFarmerMess}/>
          <Stack.Screen name="ProductAction" component={ProductAction}/>
          <Stack.Screen name="FindSourceProduct" component={FindSourceProduct}/>
          <Stack.Screen name="ProductEndSeason" component={ProductEndSeason}/>
          <Stack.Screen name="ProductVerify" component={ProductVerify}/>
          <Stack.Screen name="ListMessage" component={ListMessage}/>
          <Stack.Screen name="AddQR" component={ProductAddQR}/>
          <Stack.Screen name="ListProduct" component={HomePageListProduct}/>
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="ListHouseHold" component={  ProductListHouseHold}/>
          <Stack.Screen name="AddGroup" component={HomePageAddGroup}/>
          <Stack.Screen name="ListGroup" component={HomePageListGroup}/>
          <Stack.Screen name="Intro" component={Intro}/>
          <Stack.Screen name="HomePage1" component={HomePage1}/>
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
          <Stack.Screen name="ProductEdit" component={ProductEdit} /> 
          <Stack.Screen name="ProductDiary" component={ProductDiary} />
          <Stack.Screen name="ProductHome" component={ProductHome} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ProductType" component={ProductType} />
          <Stack.Screen name="ProductDefaultInfo" component={ProductDefaultInfo} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
  }