import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';
import { useDevice } from '../../hooks/useDevice';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      height: 120,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: colors.white,
      paddingTop: iOS ? 20 : 10
   },
   buttonBack: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
   },
   logo: {
      marginTop: iOS ? 10 : 0
   },
   title: {
      color: colors.black,
      fontFamily: fonts.regular,
      fontSize: 16
   }
});

export default styles;