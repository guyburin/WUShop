/*Home Screen With buttons to navigate to different options*/
import React, { Component } from 'react';
import { View ,StyleSheet,ActivityIndicator,Image,FlatList,RefreshControl,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Badge ,Button,Text} from 'native-base';
import Mybuttonhome from './components/Mybuttonhome';
import { TextInput } from 'react-native';
import Mytext from './components/Mytext';
import LoadHome from './components/LoadHome.js'
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      titleText: "----------หมวดหมู่----------",
      bodyText: 'This is not really a bird nest.',
      FlatListItems: [],
      loading :'false',
      like:4,

    };
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='post'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS post', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS post(post_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(255), comment VARCHAR(255), img VARCHAR(255),time VARCHAR(255),like INTEGER)',
              []
            );
          }
        }
      );
    });

    
    
  }
  
  deletepost = (post_id) => {
    alert(post_id);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  post where post_id=?',
        [post_id],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          // alert(JSON.stringify(results));
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Post deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Delete error Post Id');
          }
        }
      );
    });
};

addlike = (post_id) => {
  // alert('come in');
  var likeview=this.state.like+1;
  this.setState({like:likeview})
  var that = this;
  const { like } = this.state;

  // alert(like+" "+post_id);
  
      if (like) {
        // alert('come in 3');
        db.transaction(function(tx) {
          tx.executeSql('UPDATE post SET like=? WHERE post_id=?',
          [like,post_id],
            (tx, results) => {
              // console.log('Results', results.rowsAffected);
              
                Alert.alert(
                  "suscess",[
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },]
                  
                  
                );
  
              // alert('suscess')
            }
            // ,(error) => { alert(error) }// ,(error) => { alert(JSON.stringify(error)) }
          );
        });
      } else {
        alert('Like fail');
      }
};
  
  componentWillMount(){
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM post ORDER BY post_id DESC LIMIT 1;', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
    // alert("aaaa");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
       <Text style={{textAlign: 'center',fontSize: 20}} onPress={this.onPressTitle}>
       {'\n'}{this.state.titleText}
        </Text>
        <View style={styles.layoutrow}>
        <Mybuttonhome
          title="   เสื้อผ้า    "
          customClick={() => this.props.navigation.navigate('m1')}
        />
        <Mybuttonhome
          title="   รองเท้า   "
          customClick={() => this.props.navigation.navigate('m2')}
        />
        <Mybuttonhome
          title="   กระเป๋า   "
          customClick={() => this.props.navigation.navigate('m3')}
        />
        </View>
        {/* ------------------------------------------------------------------------------------ */}
        <View style={styles.layoutrow}>
        <Mybuttonhome 
          title="   อาหาร    "
          customClick={() => this.props.navigation.navigate('m4')}
        />
        <Mybuttonhome
          title="   ของใช้    "
          customClick={() => this.props.navigation.navigate('m5')}
        />
        <Mybuttonhome
          title=" เครื่องสำอาง "
          customClick={() => this.props.navigation.navigate('m6')}
        />
        </View>
        <View style={styles.layoutrow}><Text style={{marginLeft: 50,fontSize: 20}}>Post ล่าสุด</Text><ActivityIndicator size="large" color="#FFCC33" /></View>

        {/* <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.post_id} style={{ backgroundColor: 'white', padding: 20 ,marginLeft:50}}>
              <Text>ผู้ใช้ : {item.user_name}</Text>
              <Text>ความคิดเห็น: {item.comment}</Text>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}><Image source={{uri: item.img}}
              style={{width: 300, height: 175,marginTop:5,marginBottom:5}} /></View>
              <Text>โพสต์เมื่อ : {item.time}</Text>
              </View>
          )}
        /> */}
         <View style={styles.textbox2}>
         <FlatList style={styles.list}
          data={this.state.FlatListItems}
          keyExtractor= {(item) => {
            return item.post_id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
               
               <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.user_name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{uri:item.img}}/>
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => {this.addlike(item.post_id)}}>
                        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/android/75/e74c3c/hearts.png'}}/>
                        <Text style={styles.socialBarLabel} >{this.state.like}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection} key={item.post_id}>
                      <TouchableOpacity style={styles.socialBarButton} onPress ={()=>{this.props.navigation.navigate('edit',{post_id: item.post_id})}}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material-rounded/24/000000/edit.png'}}/>
                        <Text style={styles.socialBarLabel}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={() => {this.deletepost(item.post_id)}}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/48/000000/recycle-bin.png'}}/>
                        <Text rkType='primary4 hintColor' style={styles.socialBarLabel}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
         </View>
         
         <Content />
          <Footer>
          <FooterTab style = {{ backgroundColor: '#ffcc33', color:'#ffffff'}}>
            <Button active style={{backgroundColor:'##B6B900',color:'#eeeeee'}} vertical >
              {/* <Badge><Text>2</Text></Badge> */}
              <Icon style={{color:'#ffffff'}}  name="home" />
              <Text style={{color:'#ffffff'}}>Home</Text>
            </Button>
            <Button style={{backgroundColor:'##B6B900',color:'#ffffff'}} vertical  onPress={() => this.props.navigation.navigate('Post')}>
              <Icon style={{color:'#ffffff'}} name="book" />
              <Text style={{color:'#ffffff'}}>Post</Text>
            </Button>
            <Button style={{backgroundColor:'##B6B900',color:'#ffffff'}} vertical onPress={() => this.props.navigation.navigate('chat')}>
              {/* <Badge ><Text>2</Text></Badge> */}
              <Icon style={{color:'#ffffff'}} name="chatboxes" />
              <Text style={{color:'#ffffff'}}>Chat</Text>
            </Button> 
             <Button style={{backgroundColor:'##B6B900',color:'#ffffff'}} vertical onPress={() => this.props.navigation.navigate('profile')}>
              <Icon style={{color:'#ffffff'}} name="contact" />
              <Text style={{color:'#ffffff'}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>

      </View> 
    );
  }
}

const styles = StyleSheet.create({
  headname: {
    textAlign: 'center',
  },
  textbox:{
    height: 40, 
    borderColor: 'gray',
     borderWidth: 1,
     marginTop: 16,marginLeft: 50,
      marginRight: 50,
  },
  textbox2:{
    marginTop: 0,
      marginLeft: 50,
      marginRight: 50,
  },
  textboxs:{
    height: 40, 
    borderColor: 'gray',
     borderWidth: 1,
     marginTop: 10,
     marginLeft: 300,
     marginRight: 50,
  },
  layoutrow:{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:0,
    marginTop: 20,
    height:90},
    stretch: {
      alignContent : 'center',
    resizeMode: 'stretch'
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
    height: 150,
    width: null,
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
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
     

  
});