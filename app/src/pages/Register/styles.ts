import { StyleSheet, Platform } from 'react-native';

import { colors, fonts } from '../../styles/global';

const styles = StyleSheet.create({
   container: {
      flex: 1,
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
   selectImageContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
   },
   selectImage: {
      width: '60%',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonSelectImage: {
      width: 140,
      borderRadius: 70,
      height: 140,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: colors.gray,
      alignItems: 'center',
      justifyContent: 'center'
   },
   plus: {
      width: 30,
      borderWidth: 2,
      borderColor: colors.white,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 10,
      right: 30 
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