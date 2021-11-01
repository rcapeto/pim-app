import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';
import { useDevice } from '../../hooks/useDevice';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      marginTop: iOS ? 80 : 10
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   title: {
      fontFamily: fonts.bold,
      fontSize: 20,
      color: colors.gray
   },
   reservations: {
      fontSize: 12,
      color: colors.gray,
      fontFamily: fonts.medium
   },
});

export default styles;