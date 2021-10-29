import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../../pages/Home';
import { MyReservations } from '../../pages/MyReservations';
import { Profile } from '../../pages/Profile';

import { BottomTab } from '../../components/BottomTab';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
   return(
      <Navigator
         screenOptions={{
            headerShown: false,
         }}
         tabBar={props => <BottomTab {...props}/>}
      >
         <Screen 
            name="Home"
            component={Home}
         />
         <Screen 
            name="MyReservations"
            component={MyReservations}
         />
          <Screen 
            name="Profile"
            component={Profile}
         />
      </Navigator>
   );
}