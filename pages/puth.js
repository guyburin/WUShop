 /*Screen to view all the user*/
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import ManageButton from './components/ManageButton';
import ManageButton2 from './components/ManageButton2';


var db = openDatabase({ name: 'tc_db.db' }); 
export default class Booked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
      book_id: '',  
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM booked', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }

        this.setState({
          FlatListItems: temp,
        });
      });
    }, function(err) {
      alert('Open database ERROR: ' + JSON.stringify(err));
    });
  }
  deleteBook = (book_id) => {
      alert(book_id);
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM  booked where book_id=?',
          [book_id],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
            alert(JSON.stringify(results));
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Success',
                'User deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => that.props.navigation.navigate('Booked'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Please insert a valid Book Id');
            }
          }
        );
      });
  };


  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#ffffff' }} />
    );
  };
  render() {
    return (
      <Container>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.book_id} style={{ backgroundColor: '#D7BDE2', padding: 20 }}>
              <Text>Id: {item.book_id}</Text>
              <Text>Service: {item.book_ser}</Text>
              <Text>Car: {item.book_car}</Text>
              <Text>Start: {item.book_start}</Text>
              <Text>End: {item.book_end}</Text>
              <Text>Date: {item.date}</Text>

              <View style = {{flexDirection: 'row', justifyContent : 'space-around'}}>
              <ManageButton
              title="Edit"  
              customClick={() =>  this.props.navigation.navigate('EditBook', {book_id: item.book_id})  }  
               /> 

              <ManageButton2
              title="Cancle"  
              customClick={() => {this.deleteBook(item.book_id)}}
               /> 

              </View>  
            </View>
          )}
        />

        <Content />
          <Footer>
          <FooterTab style = {{ backgroundColor: '#957DAD'}}>
            <Button vertical onPress={() => this.props.navigation.navigate('HomeScreen')}>
              {/* <Badge><Text>2</Text></Badge> */}
              <Icon  name="home" />
              <Text>home</Text>
            </Button>
            <Button vertical  onPress={() => this.props.navigation.navigate('called')}>
              <Icon name="time" />
              <Text>histoy</Text>
            </Button>
            <Button active badge vertical onPress={() => this.props.navigation.navigate('Booked')}>
              <Badge ><Text>2</Text></Badge>
              <Icon active name="book" />
              <Text>book</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}