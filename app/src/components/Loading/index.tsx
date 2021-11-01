import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { colors, fonts } from '../../styles/global';

interface Props extends ActivityIndicatorProps {
   text: string;
};

export const Loading: FunctionComponent<Props> = ({
   text, ...rest
}) => {
   return(
      <View style={styles.container}>
         <ActivityIndicator {...rest}/>
         <Text style={styles.text}>
            {text}
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
      fontSize: 14,
      fontFamily: fonts.medium,
      marginTop: 6
   }
});