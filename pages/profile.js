import React, { Component } from 'react';
import {
  StyleSheet,

  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Badge ,Button,Text} from 'native-base';

export default class ProfileView extends Component {
    

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/69298633_886303648398771_5526286668316803072_n.jpg?_nc_cat=107&_nc_eui2=AeGBnhfnO1DB4Dx0igE2bdipRQVhLN7IvwAXGdFekxzUX8-BtZ0cABsH5oMutvCTEVsYtr4_DV6jBdCiG_qpRSfmmvkbFSyHdJyJq-sHdXs35Q&_nc_oc=AQmPNBzvciW-P2DTRg2Qu3ExYkEoEXZXH2Oa5YpL-8UkCzqYShARqXRZSlZYwBHmrEs&_nc_pt=1&_nc_ht=scontent.fbkk10-1.fna&oh=cf12211c55e6ce3331eeb7b948fa8ddc&oe=5DFD730C'}}/>
                <Text style={styles.name}>Gaidmanee</Text>
            </View>
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Post</Text>
              <Text style={styles.count}>5</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Followers</Text>
              <Text style={styles.count}>52</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Following</Text>
              <Text style={styles.count}>25</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              
              <Text style={styles.description}>FB : Gaidmanee Thongbai</Text>
              <Text style={styles.description}>Line : popeye02</Text>
              {/* <Text style={styles.description}>สนใจติดต่อสอบถามสั่งสินค้าเพิ่มเติมได้ที่ <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('chat')}}><Text style={styles.description}>chat</Text></TouchableOpacity> </Text> */}

            </View>
            <Content />
          <Footer style={{marginTop:220}}>
          <FooterTab style = {{ backgroundColor: '#ffcc33', color:'#ffffff'}}>
            <Button  style={{backgroundColor:'##B6B900',color:'#eeeeee'}} vertical onPress={() => this.props.navigation.navigate('HomeScreen')}>
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
             <Button active style={{backgroundColor:'##B6B900',color:'#ffffff'}} vertical >
              <Icon style={{color:'#ffffff'}} name="contact" />
              <Text style={{color:'#ffffff'}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
        </View>
      </View> 

        
      </View>
    );
  }
}


 


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00CED1",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#00CED1"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00CED1",
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
});