import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Icon, Badge ,Button,Text} from 'native-base';
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, date:"10:04 am", type:'in',  message: "ui chat 9"},
        {id:2, date:"10:02 am", type:'out', message: "ui chat 8"} ,
        {id:3, date:"9:59 am", type:'in',  message: "ui chat 7"}, 
        {id:4, date:"9:58 am", type:'in',  message: "ui chat 6"}, 
        {id:5, date:"9:57 am", type:'out', message: "ui chat 5"}, 
        {id:6, date:"9:56 am", type:'out', message: "ui chat 4"}, 
        {id:7, date:"9:56 am", type:'in',  message: "ui chat 3"}, 
        {id:8, date:"9:53 am", type:'in',  message: "ui chat 2"},
        {id:9, date:"9:50 am", type:'in',  message: "ui chat 1"},
      ]
    };
  }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}/>
          </View>

            <TouchableOpacity style={styles.btnSend}>
              <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
            </TouchableOpacity>
        </View>
        <Content />
          <Footer>
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
            <Button active style={{backgroundColor:'##B6B900',color:'#ffffff'}} vertical >
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
  container:{
    flex:1
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#eeeeee',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
});  