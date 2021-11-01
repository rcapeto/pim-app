import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoutes } from './tabs';
import { RoomPage } from '../../pages/Room';
import { RoomReservation } from '../../pages/RoomReservation';
import { StackHeader } from '../../components/StackHeader';

const { Navigator, Screen } = createNativeStackNavigator();

export default function UserRoutes() {
   return(
      <Navigator
         screenOptions={{
            headerShown: false
         }}
      >
         <Screen 
            name="TabRoutes"
            component={TabRoutes}
         />
          <Screen 
            name="Room"
            component={RoomPage}
            options={{
               headerShown: true,
               header: () => <StackHeader hasLogo/>
            }}
         />
         <Screen 
            name="RoomReservation"
            component={RoomReservation}
            options={{
               headerShown: true,
               header: () => <StackHeader title="Fazer Reserva"/>
            }}
         />
      </Navigator>
   );
}