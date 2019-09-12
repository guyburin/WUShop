import React, {Component} from 'react';
import { View, Image,StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    stretch: {
        alignContent : 'center',
      resizeMode: 'stretch'
    }
  });

class LoadHome extends Component{

    render(){ 
        return(
            <div>
                {/* <Image
                    style={styles.stretch}
                    source={require('../images/logo.png')}
                /> */}
            </div>
        )
    }
}



export default LoadHome;