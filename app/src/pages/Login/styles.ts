import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.white,
   },
   content: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 50,
   },
   header: {},
   title: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: 30,
      marginBottom: 10
   },
   description: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.gray
   },
   form: {
      paddingTop: 40
   },
   buttonContainer: {
      width: '100%',
      marginTop: 10
   },
   button: {
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 8
   },
   buttonText: {
      color: colors.white,
      fontSize: 16,
      fontFamily: fonts.medium
   },
   registerContainer: {
      width: '100%',
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center'
   },
   registerButton: {
      borderBottomWidth: 1,
      borderColor: colors.black,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8
   },
   registerButtonText: {
      color: colors.gray,
      fontSize: 16,
      fontFamily: fonts.regular
   },
   errorContainer: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
   },
   errorMessage: {
      color: colors.red,
      fontFamily: fonts.regular,
      fontSize: 14
   },
});

export default styles;