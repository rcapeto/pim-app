import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';

import styles from './styles';
import { Room } from '../../@types/data';
import { Loading } from '../../components/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';

interface RoomParam {
   room: Room
}

export const RoomPage: FunctionComponent = () => {
   const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const { params } = useRoute();
   const navigation = useNavigation();

   const getRoom = () => {
      setLoading(true);

      if(params && Reflect.has(params, 'room')) {
         const { room } = params as RoomParam;
         room && setCurrentRoom(room);
      }

      setLoading(false);
   };

   const handleNavigate = () => {
      currentRoom && navigation.dispatch(
         CommonActions.navigate({
            name: 'RoomReservation',
            params: {
               room_id: currentRoom.id
            }
         }),
      )
   };

   useEffect(() => {
      getRoom();
   }, []);

   if(loading) return <Loading text="Carregando..." size="large"/>

   if(!currentRoom) 
      return <ErrorMessage 
         text="Ops... tivemos um problema, tente novamente mais tarde"
      />;

   const { 
      comments,
      description,
      image,
      images,
      infos,
      name,
      price
   } = currentRoom;

   return(
      <ScrollView style={styles.container}>
         <View style={styles.header}>
            <Image 
               style={[styles.image, { height: 300 }]}
               source={{ uri: image }}
            />
            <View style={styles.nameContainer}>
               <Text style={styles.name}>
                  {name}
               </Text>
            </View>
         </View>
         <View style={styles.content}>
            <Text style={styles.title}>
               Descrição
            </Text>
            <Text style={styles.description}>
               {description}
            </Text>

            <Text style={styles.title}>
               Informações
            </Text>

            {
               infos.map((info, index) => (
                  <Text style={styles.description} key={String(index)}>
                     - {info}
                  </Text>
               ))
            }

         <Text style={styles.title}>
            Mais fotos
         </Text>

         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
         >
            {
               images.map((currentImage, index) => (
                  <Image 
                     source={{ uri: currentImage.url }}
                     style={styles.image}
                     key={String(index)}
                  />
               ))
            }
         </ScrollView>

         <Text style={styles.title}>
            Comentários
         </Text>

         {
            comments.map(comment => (
               <View style={styles.comment} key={String(comment.id)}>
                  <Text style={styles.commentText}>"{comment.text}"</Text>
                  <Text style={styles.commentAuthor}>{comment.user}</Text>
               </View>
            ))
         }

         <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Reserva Já</Text>
         </TouchableOpacity>
         </View>        
      </ScrollView>
   );
};