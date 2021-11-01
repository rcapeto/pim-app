import React, { FunctionComponent } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useApp } from '../../../../contexts/app';
import { ReservationResponse } from '../../../../@types/data';
import { system_name } from '../../../../config/system';
import { useAPI } from '../../../../contexts/api';
import { colors, fonts } from '../../../../styles/global';
import { formatPrice } from '../../../../utils';

type Props = ReservationResponse;

export const Reservation: FunctionComponent<Props> = props => {
   const { removeReservation } = useApp();
   const { loadingAPI } = useAPI();

   const {
      reservation: {
         enter_date,
         exit_date,
         id
      },
      room: {
         image,
         name,
         price
      }
   } = props;

   const handleRemoveReservation = async () => {
      try {
         await removeReservation(id);
         Alert.alert(system_name, 'Reserva removida com sucesso!');
      } catch(error) {
         console.error(error);
         Alert.alert(system_name, 'Ops.. falha em remover essa reserva, tente novamente mais tarde.');
      }
   };

   return(
      <View style={styles.container}>
         <View style={styles.roomContainer}>
            <Image 
               style={styles.image}
               source={{ uri: image }}
            />
            <View style={styles.roomData}>
               <Text style={styles.name}>{name}</Text>
               <View>
                  <Text style={styles.date}>Entrada: {enter_date}</Text>
                  <Text style={styles.date}>Saída: {exit_date}</Text>
               </View>
               <View style={styles.priceTag}>
                  <Text style={styles.priceText}>
                     {formatPrice(price)}/noite
                  </Text>
               </View>
            </View>
         </View>
         <View style={styles.deleteContainer}>
            <TouchableOpacity
               onPress={handleRemoveReservation}
            >
              {
                  loadingAPI ? (
                    <ActivityIndicator />
                 ) : (
                  <Feather 
                     name="trash"
                     size={20}
                  />
                 )
              }
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      height: 125,
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   roomContainer: {
      flexDirection: 'row',
   },
   image: {
      height: '100%',
      width: 100,
      borderRadius: 8,
      resizeMode: 'contain',
   },
   roomData: {
      marginLeft: 10,
      justifyContent: 'space-between',
      paddingVertical: 10
   },
   name: {
      color: colors.black,
      fontFamily: fonts.bold,
      fontSize: 14,
   },
   priceTag: {
      backgroundColor: colors.black,
      borderRadius: 8,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center'
   },
   priceText: {
      color: colors.white,
      fontFamily: fonts.bold,
      fontSize: 12
   },
   date: {
      fontFamily: fonts.regular,
      color: colors.gray
   },
   deleteContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
   }
});