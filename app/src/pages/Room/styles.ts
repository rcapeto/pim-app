import { StyleSheet, Dimensions } from 'react-native';

import { useDevice } from '../../hooks/useDevice';
import { colors, fonts } from '../../styles/global';

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      height: 300,
      position: 'relative'
   },
   nameContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-end'
   },
   image: {
      height: 220,
      width: Dimensions.get('screen').width,
      resizeMode: 'cover'
   },
   content: {
      padding: 10,
      backgroundColor: colors.white
   },
   name: {
      fontFamily: fonts.bold,
      fontSize: 26,
      color: colors.white,
      marginBottom: 20
   },
   title: {
      fontSize: 18,
      marginBottom: 20,
      fontFamily: fonts.medium,
      color: colors.black,
      marginTop: 20
   },
   description: {
      fontSize: 14,
      color: colors.gray,
      fontFamily: fonts.regular
   },
   comment: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20
   },
   commentText: {
      textAlign: 'center',
      color: colors.gray,
      fontFamily: fonts.medium,
      width: '50%'
   },
   commentAuthor: {
      textAlign: 'center',
      color: colors.black,
      fontSize: 14,
      fontFamily: fonts.bold,
      width: '45%'
   },
   button: {
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 8,
      width: '80%',
      alignSelf: 'center'
   },
   buttonText: {
      fontFamily: fonts.bold,
      color: colors.white,
      fontSize: 16,
   }
});

export default styles;