/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert ,TextInput,StyleSheet, Text,FlatList,Image,
  TouchableOpacity,} from 'react-native';
  import Autolink from 'react-native-autolink';
  import Mybuttonlogo from './components/Mybuttonlogo';
  import { IconButton, Colors } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });
 
export default class logo extends React.Component {
  
    
    constructor(props){
        super(props);
        this.state = {
          timeout: false
        };

        
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
    
      render() {
        setTimeout(() => {
            this.setState({
                timeout : true
            })
        }, 3000);
        if (!this.state.timeout){
          return (
            <View style={styles.container}>
            <View style={styles.body}>
              <Image style={styles.img} source={require('../images/logo.png')}/>
           </View>
           </View>
          )
        }else{
          return (
                
            <View style={styles.container}>
            <View style={styles.body}>
              <Image style={styles.img} source={require('../images/logo.png')}/>

              <Mybuttonlogo
                title=" Login "
                customClick={() => this.props.navigation.navigate('login')}
                />
                
                <Mybuttonlogo 
                icon='home'
                title=" Register "
                customClick={() => this.props.navigation.navigate('register')}
                />
           </View>
           </View>
          );
        }
      }
    

 
  



}

const styles = StyleSheet.create({
    container : {
        backgroundColor :'#f5fcff',
        flex:1,
        justifyContent:'center',
    },
    body : {
        backgroundColor :'#ffffff',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    img :{
        height: 175,
        width: 350
    }

    
  
});