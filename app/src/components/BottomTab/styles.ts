import { StyleSheet, Dimensions } from 'react-native';

import { colors, fonts } from '../../styles/global';
import { useDevice } from '../../hooks/useDevice';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      width: Dimensions.get('screen').width,
      backgroundColor: colors.white,
      height: iOS ? 75 : 65,
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   tab: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '33%',
      opacity: 0.6
   },
   tabText: {
      marginTop: 5,
      color: colors.black,
      fontFamily: fonts.medium
   },
   activeTab: {
      opacity: 1
   },
   image: {
      width: 25,
      height: 25,
      borderRadius: 12,
      backgroundColor: colors.red
   },
});

export default styles;