import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { colors, fonts } from '../../styles/global';
import { useAPI } from '../../contexts/api';
import { useApp } from '../../contexts/app';
import { ErrorMessage } from '../../components/ErrorMessage';
import { CustomInput } from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import { system_name } from '../../config/system';
import { inputMask } from '../../utils';

interface Params {
   room_id: string;
}

const initialFormData = {
   enter_date: '',
   exit_date: ''
};

export const RoomReservation = () => {
   const { user, handleSetReservations } = useApp();
   const { createReservation, loadingAPI, getReservations } = useAPI();
   const { params } = useRoute();
   const { checkFields } = useForm();
   const { goBack } = useNavigation();

   const [hasReservation, setHasReservation] = useState(false);
   const [formData, setFormData] = useState(initialFormData);


   const roomId = params && Reflect.has(params, 'room_id') && (params as Params).room_id;

   if(!roomId) {
      return(
         <ErrorMessage 
            text="Ops... tivemos um erro, por favor tente novamente mais tarde"
         />
      );
   }

   const handleReservation = async () => {
      const { message, hasEmptyFields } = checkFields(formData);
   
      if(hasEmptyFields) {
         return Alert.alert(system_name, message);
      }

      if(user.profile && roomId) {
         const { id: user_id } = user.profile;
         const reservationData = {
            room_id : roomId,
            user_id,
            ...formData
         };

         try {
            const response = await createReservation(reservationData);

            if(response.data) {
               Alert.alert(system_name, 'Reserva criada com sucesso!', [
                  { text: '😉', onPress: goBack, style: 'default'}
               ]);

               const data = await getReservations(user.profile.id);

               if(data.reservations) {
                  handleSetReservations(data.reservations);
               }
            } else {
               Alert.alert(system_name, response.message);
            }
         } catch(err) {
            Alert.alert(system_name, 'Ops... ocorreu um erro interno! Tente novamente mais tarde!');
         }
      }
   };

   const checkHasReservation = () => {
      if(!roomId) return;

      const reservation = user.reservations.find(
         res => String(res.room.id) == roomId
      );

      reservation && setHasReservation(true);
   };

   useEffect(() => {
      checkHasReservation();
   }, []);
   
   return(
      <View style={styles.container}>
         {
            hasReservation && 
            <Text style={styles.errorMessage}>
               Ops... você já possui reserva nesse quarto!
            </Text>
         }
         <Text style={styles.title}>Reserva</Text>

         <CustomInput 
            label="Check-in"
            placeholder="DD/MM/AAAA"
            value={formData.enter_date}
            onChangeText={
               text => setFormData({
                  ...formData,
                  enter_date: inputMask('birth_date', text),
               })
            }
         />
         <CustomInput 
            label="Check-out"
            placeholder="DD/MM/AAAA"
            value={formData.exit_date}
            onChangeText={
               text => setFormData({
                  ...formData,
                  exit_date: inputMask('birth_date', text),
               })
            }
         />

         <TouchableOpacity 
            style={[
               styles.button,
               hasReservation ? styles.disabled : {}
            ]} 
            onPress={handleReservation}
            disabled={hasReservation}
         >
            {
               loadingAPI ? (
                  <ActivityIndicator />
               ) : (
                  <Text style={styles.buttonText}>Reservar</Text>
               )
            }
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 10
   },
   errorMessage: {
      color: colors.red,
      fontSize: 16,
      fontFamily: fonts.medium,
      marginTop: 20
   },
   title: {
      marginVertical: 20,
      fontSize: 20,
      color: colors.black,
      fontFamily: fonts.bold
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
   },
   disabled: {
      display: 'none'
   },
});