import { StyleSheet, Platform } from 'react-native';

import { colors, fonts } from '../../styles/global';

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
   container: {
      height: isIOS ? 130 : '',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: colors.white
   },
   buttonBack: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
   },
   logo: {
      marginTop: isIOS ? 10 : 0
   },
   title: {
      color: colors.black,
      fontFamily: fonts.regular,
      fontSize: 16
   }
});

export default styles;