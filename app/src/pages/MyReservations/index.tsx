import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import { useApp } from '../../contexts/app'; 
import { ErrorMessage } from '../../components/ErrorMessage';
import { Reservation } from './components/Reservation';

export function MyReservations() {
   const [refreshing, setRefreshing] = useState(false);

   const { user, handleGetReservations } = useApp();

   if(
      !user.reservations ||
      !user.reservations.length
   )
      return(
         <ErrorMessage text="Você não possui reservas..."/>
      );

   const refreshList = async () => {
      await handleGetReservations();
      setRefreshing(false);
   };

   useEffect(() => {
      handleGetReservations();
   }, []);

   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.title}>Minhas reservas</Text>
            <Text style={styles.reservations}>Reservas: {user.reservations.length}</Text>
         </View>

         <FlatList 
            contentContainerStyle={{
               paddingVertical: 20
            }}
            data={user.reservations}
            keyExtractor={ item => String(item.reservation.id)}
            renderItem={
               ({ item }) => <Reservation {...item} />
            }
            onRefresh={refreshList}
            refreshing={refreshing}
         />
      </View>
   );
}