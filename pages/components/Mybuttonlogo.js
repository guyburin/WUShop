/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybuttonhome = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};


 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#ffcc33',
    color: '#f05555',
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    width:300,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});
export default Mybuttonhome;