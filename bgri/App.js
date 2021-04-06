/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,LogBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createSwitchNavigator} from '@react-navigation/compat';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import store from 'src/redux/rootStore';
import {Provider} from 'react-redux';

import {
  HomePage1,
  HomePage2,
  ProductHome,
  ProductInfo,
  ProductEdit,
  ProductDiary,
  AddProduct,
  ProductType,
  Intro,
  Signin,
  Signup,
  ProfileScreen
} from './src/pages';

import {MyStack} from './Stack';


const App = () => {
  // LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreAllLogs();
 
  return (
    // <MyComponent/>
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
