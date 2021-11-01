import { StyleSheet } from 'react-native';

import { useDevice } from '../../hooks/useDevice';
import { colors, fonts } from '../../styles/global';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      height: iOS ? 140 : 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white
   }
});

export default styles;