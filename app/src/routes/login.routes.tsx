import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StackHeader } from '../components/StackHeader';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

const { Navigator, Screen } = createNativeStackNavigator();

export default function LoginRoutes() {
   return(
      <Navigator
         screenOptions={{ 
            headerShown: false
         }}
      >
         <Screen 
            name="Login"
            component={Login}
         />
         <Screen 
            name="Register"
            component={Register}
            options={{
               headerShown: true,
               header: () => <StackHeader hasLogo/>,
            }}
         />
      </Navigator>
   );
}