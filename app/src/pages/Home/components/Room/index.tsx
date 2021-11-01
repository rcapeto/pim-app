import React, { FunctionComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { Room } from '../../../../@types/data';
import { formatPrice } from '../../../../utils';
import styles from './styles';

type Props = Room;

export const RoomComponent: FunctionComponent<Props> = (props) => {
   const navigation = useNavigation();
   const { name, description, image, price } = props;

   const handleNavigate = () => {
      navigation.dispatch(
         CommonActions.navigate({
            name: 'Room',
            params: {
               room: props
            }
         })
      );
   };

   return(
      <TouchableOpacity 
         style={styles.container} 
         activeOpacity={.8}
         onPress={handleNavigate}
      >
         <Image 
            style={styles.image}
            source={{ uri: image }}
         />
         <View style={styles.flex}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.priceContainer}>
               <Text style={styles.priceText}>
                  {formatPrice(price)} por noite
               </Text>
            </View>
         </View>

         <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>
               Descrição
            </Text>

            <Text style={styles.descriptionText}>{description}</Text>
         </View>
      </TouchableOpacity>
   );
};