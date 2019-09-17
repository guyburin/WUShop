import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });

export default class ContactView extends Component {

  constructor(props) {
    super(props);
    state = {
      user_id:'',
      username:'',
      email   : '',
      password: '',
      passwordconfirm:'',
      img:'',
      phone:'',
      detail1:'',
      detail2:'',
    }
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255),img VARCHAR(255),detail1 VARCHAR(255),detail2 VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }

  register_user = () => {
    // alert('come in');
    var that = this;
    const { username } = this.state;
    const { password } = this.state;
    const { passwordconfirm } = this.state;
    const { email } = this.state;
    const { phone } = this.state;
    // alert(username+''+password+''+passwordconfirm+''+email+''+phone);
    if (username) {
      // alert('come in 1');
      if (email) {
        // alert('come in 2');
        // if (phone) {
          // alert('come in 3');
          if (password == passwordconfirm) {
            // alert('come in 3');
            db.transaction(function(tx) {
              tx.executeSql('INSERT INTO user (username, password, email) VALUES (?,?,?)',
                [username, password, email],
                (tx, results) => {
                  // console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Post Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () =>
                            that.props.navigation.navigate('login'),
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    alert('Post Failed');
                  }
                }
                ,(error) => { alert(error) }// ,(error) => { alert(JSON.stringify(error)) }
              );
            });
          } else {
            alert('please chack you password');
          }
        // } else {
        //   alert('Please fill phone');
        // }
      } else {
        alert('Please fill email');
      }
    } else {
      alert('Please input username');
    }
  };

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/logo.png')}/>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-glyphs/30/000000/user--v1.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/100/000000/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/100/000000/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Re-enter Password"
              underlineColorAndroid='transparent'
              onChangeText={(passwordconfirm) => this.setState({passwordconfirm})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios-filled/50/000000/email.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/android/24/000000/phone.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Phone"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({phone})}/>
        </View> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={() => this.register_user()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo:{
    width:250,
    height:120,
    justifyContent: 'center',
    marginBottom:20,
  },
  inputContainer: {
      borderBottomColor: '#666666',
      backgroundColor: '#eeeeee',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#666666',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
  },
  sendButton: {
    backgroundColor: "#ffcc33",
  },
  buttonText: {
    color: 'white',
  }
}); 