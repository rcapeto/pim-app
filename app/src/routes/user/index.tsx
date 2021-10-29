import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoutes } from './tabs';


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
      </Navigator>
   );
}