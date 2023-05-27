import React from 'react';
import { StyleSheet, Image } from 'react-native';

import logo from '../assets/ikon.png';

const Logo = (props) => {
  const birlesikStyle=StyleSheet.flatten([styles.logo,props.style])
  return <Image 
    style={birlesikStyle} 
    source={logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginLeft:'23%',

  },
});
export default Logo;