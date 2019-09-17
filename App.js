/*Example of SQLite Database in React Native*/
import React from 'react';
//In Version 2+
//import {createStackNavigator} from 'react-navigation';
//In Version 3+
import { View ,StyleSheet,Text} from 'react-native';
import {createStackNavigator,createBottomTabNavigator,createAppContainer} from 'react-navigation';
import m1 from './pages/m1';
import m2 from './pages/m2';
import m3 from './pages/m3';
import m4 from './pages/m4';
import m5 from './pages/m5';
import m6 from './pages/m6';
import buy from './pages/Postdetail';
import Login from './pages/Login';
import Register from './pages/Register';
import profile from './pages/profile';
import logo from './pages/logo';
import Post from './pages/Post';
import Postdetail from './pages/Postdetail';
import edit from './pages/edit';
import chat from './pages/chat';
import HomeScreen from './pages/HomeScreen';

 
// const App = createBottomTabNavigator({
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: {
//       title: 'Home',
//       headerTitleStyle: { 
//         textAlign:"center", 
//         flex:1 
//     },
//       headerStyle: { backgroundColor: '#ffcc33'}, 
//       headerTintColor: '#ffcc33',
      
//     },
//   },
//   // chat,
//   // profile,
  
  
// });

const App = createStackNavigator({
  logo: {
    screen: logo,
    navigationOptions: {
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  chat: {
    screen: chat,
    navigationOptions: {
      title: 'Chat',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
      
    },
  },
  login: {
    screen: Login,
    navigationOptions: {
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  register: {
    screen: Register,
    navigationOptions: {
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  profile: {
    screen: profile,
    navigationOptions: {
      title: 'WU SHOP',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
      
    },
  },
  Post: {
    screen: Post,
    navigationOptions: {
      title: 'Post',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
      
    },
  },
  Postdetail: {
    screen: Postdetail,
    navigationOptions: {
      title: 'Post',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
      
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'WU SHOP',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
      
    },
  },
  m1: {
    screen: m1,
    navigationOptions: {
      title: 'เสื้อผ้า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  m2: {
    screen: m2,
    navigationOptions: {
      title: 'รองเท้า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  m3: {
    screen: m3,
    navigationOptions: {
      title: 'กระเป๋า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  m4: {
    screen: m4,
    navigationOptions: {
      title: 'อาหาร',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  
  m5: {
    screen: m5,
    navigationOptions: {
      title: 'ของใช้',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  m6: {
    screen: m6,
    navigationOptions: {
      title: 'เครื่องสำอาง',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
  buy: {
    screen: buy,
    navigationOptions: {
      title: 'ชื้อ-ขาย',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
    edit: {
    screen: edit,
    navigationOptions: {
      title: 'รายละเอียด',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#ffcc33'}, 
      headerTintColor: '#ffffff',
    },
  },
})
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);
// createAppContainer(apps);

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
});

// const HomeActivity_StackNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
// }, {headerLayoutPreset: 'center'});