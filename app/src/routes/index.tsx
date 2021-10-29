import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import { useApp } from '../contexts/app';
import LoginRoutes from './login';
import UserRoutes from './user';

export function Routes() {
   const { signed, loadingApp } = useApp();

   if(loadingApp) return <AppLoading />;

   return(
      <NavigationContainer>
         {
            signed ? (
               <UserRoutes />
            ) : (
               <LoginRoutes />
            )
         }
      </NavigationContainer>
   );
}