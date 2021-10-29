import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../styles/global';
import { useDevice } from '../../hooks/useDevice';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white
   },
});

export default styles;