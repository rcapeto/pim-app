import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';
import { useDevice } from '../../hooks/useDevice';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginBottom: 20
   },
   title: {
      fontFamily: fonts.bold,
      color: colors.gray,
      fontSize: 18
   },
   buttonLogout: {
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 50
   },
   inputs: {
      marginVertical: 20
   },
   double: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   button: {
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      padding: 10,
      borderRadius: 8
   },
   buttonText: {
      fontSize: 16,
      color: colors.white,
      fontFamily: fonts.bold
   },
});

export default styles;