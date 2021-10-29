import { StyleSheet } from 'react-native';

import { useDevice } from '../../hooks/useDevice';
import { colors, fonts } from '../../styles/global';

const { iOS } = useDevice();

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});

export default styles;