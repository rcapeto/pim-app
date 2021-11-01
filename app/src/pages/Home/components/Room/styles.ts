import { StyleSheet } from 'react-native';

import { useDevice } from '../../../../hooks/useDevice';
import { colors, fonts } from '../../../../styles/global';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      marginBottom: 20,
      backgroundColor: colors.white,
   },
   image: {
      height: 300,
      width: '100%',
   },
   flex: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
      paddingVertical: 20,
      borderBottomColor: colors.gray,
      borderBottomWidth: 1,
   },
   name: {
      color: colors.gray,
      fontFamily: fonts.medium,
      fontSize: 14
   },
   priceContainer: {
      backgroundColor: colors.black,
      padding: 5,
      borderRadius: 8,
   },
   priceText: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: 12
   },
   descriptionContainer: {
      width: '90%',
      alignSelf: 'center',
      paddingTop: 10,
      paddingBottom: 30
   },
   descriptionTitle: {
      marginBottom: 5,
      color: colors.gray,
      fontSize: 14,
      fontFamily: fonts.bold
   },
   descriptionText: {
      color: colors.black,
      fontSize: 12,
      fontFamily: fonts.regular
   },
});

export default styles;