import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

import { useAPI } from '../../contexts/api';
import { RoomComponent } from './components/Room';
import { Room } from '../../@types/data';
import styles from './styles';

export function Home() {
   const [rooms, setRooms] = useState<Room[]>([]);

   const { getRooms } = useAPI();

   const handleGetRooms = async () => { 
      const data = await getRooms();
      setRooms(data.rooms);
   }

   useEffect(() => {
      handleGetRooms();
   }, []);

   return(
      <View style={styles.container}>
         <FlatList 
            data={rooms}
            contentContainerStyle={{
               paddingVertical: 10
            }}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <RoomComponent {...item}/>}
         />
      </View>
   );
}