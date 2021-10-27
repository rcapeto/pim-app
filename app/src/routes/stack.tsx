import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../pages/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
   return(
      <Navigator>
         <Screen 
            name="login"
            component={Login}
         />
      </Navigator>
   );
}