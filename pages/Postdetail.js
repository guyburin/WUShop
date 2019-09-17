/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert ,TextInput,StyleSheet, Text,FlatList,Image,
  TouchableOpacity,} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mybuttondel from './components/Mybuttondel';
import Mybuttonedit from './components/Mybuttonedit';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });
 
export default class Postdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postdetail_id: '',
      postdetail_img: '',
      postdetail: '',
      postdetail_time: '',
      FlatListItems: [],
      buy_user: '',
      username: '',
      post_id:''
    };

    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='postdetail'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS postdetail', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS postdetail(postdetail_id INTEGER PRIMARY KEY AUTOINCREMENT, postdetail_img VARCHAR(255), postdetail VARCHAR(255),postdetail_time VARCHAR(255),buy_user VARCHAR(255),username VARCHAR(255),post_id INTEGER)',
              []
            );
          }
        }
      );
    });


    db.transaction(tx => {
      tx.executeSql('SELECT * FROM postdetail ORDER BY postdetail_id DESC;', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  register_user = () => {
    // alert('come in');
    this.setState({postdetail_time:new Date()})
    var that = this;
    const { username } = this.state;
    const { postdetail } = this.state;
    const { postdetail_img } = this.state;
    const { postdetail_time } = this.state;
    // alert(username+" "+postdetail+" "+postdetail_img)
    alert(postdetail_time);
    if (username) {
      // alert('come in 1');
      if (postdetail) {
        // alert('come in 2');
        if (postdetail_img) {
          // alert('come in 3');
          db.transaction(function(tx) {
            tx.executeSql('INSERT INTO postdetail (username, postdetail, postdetail_img, postdetail_time) VALUES (?,?,?,?)',
              [username, postdetail, postdetail_img, postdetail_time],
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
                          that.props.navigation.navigate('Postdetail'),
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
          alert('Please fill Image link');
        }
      } else {
        alert('Please fill comment');
      }
    } else {
      alert('Please Login');
    }
  };
  // placeholder="Enter Name"
  deletepost = (postdetail_id) => {
    // alert(post_id);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  postdetail where postdetail_id=?',
        [postdetail_id],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          // alert(JSON.stringify(results));
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'postdetail deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('Postdetail'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Delete error postdetail Id');
          }
        }
      );
    });
};


  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text style={{marginLeft: 50,fontSize: 20}}>Post Description</Text>
        <TextInput
          style={styles.textbox}
          placeholder="Profile"
          underlineColorAndroid='transparent'
          onChangeText={(username) => this.setState({username})}
          //value={this.state.user}
        />
        
        <TextInput
          style={styles.textbox}
          placeholder="comment"
          underlineColorAndroid='transparent'
          onChangeText={(postdetail) => this.setState({postdetail})}
          // value={this.state.text}
        />
        <TextInput
          style={styles.textbox}
          placeholder="Link image"
          underlineColorAndroid='transparent'
          onChangeText={(postdetail_img) => this.setState({postdetail_img})}
          // value={this.state.text}
        />
            
          </KeyboardAvoidingView>
          <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
         
        <FlatList style={styles.list}
          data={this.state.FlatListItems}
          keyExtractor= {(item) => {
            return item.postdetail_id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(postdetail) => {
            const item = postdetail.item;
            return (
              <View style={styles.card}>
               
               <View style={styles.cardHeader}>
                  <View>
                  {/* <View style={styles.row}>
                  <Image style={styles.icon} source={{uri: 'https://png.icons8.com/metro/75/3498db/administrator-male.png'}}/> 
                  </View> */}
                  <Text style={styles.title}>{item.username}</Text>
                    <Text style={styles.time}>{item.postdetail_time}</Text>
                    <Text style={styles.comment}>{item.postdetail}</Text>
                  </View>
                </View>

                {/* <Image style={styles.cardImage} source={{uri:item.img}}/> */}
                <View style={styles.socialBarButton}><Image style={styles.cardImage} source={{uri:item.postdetail_img}}/></View>
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/dotty/50/000000/shopping-cart.png'}}/>
                        <Text style={styles.socialBarLabel}>กาย บุรินทร์</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => this.deletepost(item.postdetail_id)}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/48/000000/recycle-bin.png'}}/>
                        <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                    
                    
                  </View>
                </View>
              </View>
            )
          }}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headname: {
    textAlign: 'center',
  },
  row:{
    flex:2,
    flexDirection :'row'
  },
  textbox:{
    height: 40, 
    borderColor: 'gray',
     borderWidth: 1,
     marginTop: 10,marginLeft: 50,
      marginRight: 50,
      borderRadius: 15,
      marginBottom: 10 ,
  },
  layoutrow:{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:0,
    height:90
  },
    textboxs:{
      width: 100, 
      borderColor: 'gray',
       borderWidth: 1,
       marginTop: 10,marginLeft: 2,
        marginRight: 2,
        borderRadius: 15,
        marginBottom: 10 ,
    },
    container:{
      flex:1,
      marginTop:20,
    },
    list: {
      paddingHorizontal: 17,
      backgroundColor:"#ffffff",
    },
    separator: {
      marginTop: 10,
    },
    /******** card **************/
    card:{
      shadowColor: '#000000',
      shadowOffset: {
        width: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginVertical: 8,
      backgroundColor:"#ffffff",
    },
    cardHeader: {
      paddingVertical: 17,
      paddingHorizontal: 16,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContent: {
      paddingVertical: 12.5,
      paddingHorizontal: 16,
    },
    cardFooter:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 12.5,
      paddingBottom: 25,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 1,
      borderBottomRightRadius: 1,
    },
    cardImage:{
      flex: 1,
      height: 200,
      width: 150,
      justifyContent: 'center',
    alignItems: 'center',
    },
    /******** card components **************/
    title:{
      fontSize:18,
      flex:1,
    },
    time:{
      fontSize:13,
      color: "#808080",
      marginTop: 5
    },
    comment:{
      fontSize:13,
      // color: "#808080",
      marginTop: 5
    },
    icon: {
      width:25,
      height:25,
    },
    /******** social bar ******************/
    socialBarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1
    },
    socialBarSection: {
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    socialBarSection1: {
      flexDirection: 'row',
    },
    socialBarlabel: {
      marginLeft: 8,
      alignSelf: 'flex-end',
      justifyContent: 'center',
    },
    socialBarButton:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  
});