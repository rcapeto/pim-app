import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import logoImage from '../../assets/logo.png';
import { useDevice } from '../../hooks/useDevice';
import { colors } from '../../styles/global';


export const BottomHeader = () => {
   return(
      <View style={styles.header}>
         <Image 
            source={logoImage}
         />
      </View>
   );
};

const { iOS } = useDevice();

const styles = StyleSheet.create({
   header: {
      height: iOS ? 140 : 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white
   }
});