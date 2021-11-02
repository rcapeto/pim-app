import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../../pages/Home';
import { MyReservations } from '../../pages/MyReservations';
import { Profile } from '../../pages/Profile';

import { BottomTab } from '../../components/BottomTab';
import { BottomHeader } from '../../components/BottomHeader';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
   return(
      <Navigator
         screenOptions={{
            header: () => <BottomHeader />
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