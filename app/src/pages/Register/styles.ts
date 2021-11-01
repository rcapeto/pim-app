import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white
   },
   content: {
      padding: 20,
      flex: 1,
   },
   title: {
      color: colors.black,
      fontFamily: fonts.regular,
      fontSize: 24
   },
   form: {
      marginTop: 30
   },
   doubleInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   singleInput: {
      width: '100%'
   },
   buttonContainer: {
      width: '100%'
   },
   button: {
      padding: 20,
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      backgroundColor: colors.black
   },
   buttonText : {
      fontFamily: fonts.regular,
      color: colors.white,
      fontSize: 16
   },
});

export default styles;