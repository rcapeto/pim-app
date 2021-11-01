import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors, fonts } from '../../styles/global';

interface Props {
   text: string;
};

export const ErrorMessage: FunctionComponent<Props> = ({
   text
}) => {
   return(
      <View style={styles.container}>
         <Text style={styles.text}>
            {text} 😭
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
   text: {
      color: colors.black,
      fontSize: 16,
      fontFamily: fonts.medium,
      marginTop: 6,
      textAlign: 'center'
   }
});