import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });

export default class ContactView extends Component {

  constructor(props) {
    super(props);
    state = {
      username   : '',
      password   : '',
    }

    

  }

  checklogin = (username,password) => {
    // alert(username+''+password);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM user;', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          if(username == results.rows.item(i).username && password==results.rows.item(i).password){
            var name=results.rows.item(i).username;
            var pass=results.rows.item(i).password;
            if(username==name && password==pass){
              Alert.alert(
                'Success',
                'You are Login Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () =>
                      this.props.navigation.navigate('HomeScreen'),
                  },
                ],
                { cancelable: false }
              );
            }else{
              alert('check you  username&password');  
            }
          }
          
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });

    // <FlatList style={styles.list}
    //       data={this.state.FlatListItems}
    //       keyExtractor= {(item) => {
    //         return item.username;
    //       }}
    //       ItemSeparatorComponent={() => {
    //         return (
    //           <View style={styles.separator}/>
    //         )
    //       }}
    //       renderItem={(user) => {
    //         const item = user.item;
    //         if(username == item.username && password==item.password){
    //           Alert.alert(
    //             "suscess",[
    //               {
    //                 text: 'Ok',
    //                 onPress: () =>
    //                   that.props.navigation.navigate('HomeScreen'),
    //               },]
                
                
    //           );
    //         }
    //       }}/>
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
        <View style={styles.textlink}r><Text>ยังไม่มีบัญชีใช่หรือไม่?</Text><TouchableOpacity style={styles.textlink2} onPress ={()=>{this.props.navigation.navigate('register')}}><Text style={styles.textbot}>สร้างบัญชี.</Text></TouchableOpacity></View>
        <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress ={()=>{this.checklogin(this.state.username,this.state.password)}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textlink:{
      // flex:2,
      flexDirection:'row',
      justifyContent: 'flex-end'
  },
  textbot:{
    color:'#ffcc33'
  },
  textlink2:{
    // flex:2,
    flexDirection:'row',
    justifyContent: 'flex-end',
},
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
    width:200,
    borderRadius:30,
    marginTop:20
  },
  sendButton: {
    backgroundColor: "#ffcc33",
  },
  buttonText: {
    color: 'white',
  }
}); 