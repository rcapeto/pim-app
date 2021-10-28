import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackHeader } from '../components/StackHeader';

import LoginRoutes from './login.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
   return(
      <Navigator
         screenOptions={{ 
            headerShown: false
         }}
      >
         <Screen 
            name="LoginRoutes"
            component={LoginRoutes}
         />
      </Navigator>
   );
}