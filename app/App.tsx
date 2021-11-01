import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { 
   Montserrat_400Regular,
   Montserrat_700Bold,
   Montserrat_500Medium
} from '@expo-google-fonts/montserrat';
import { useFonts } from 'expo-font';

import { AppContextProvider } from './src/contexts/app';
import { ApiContextProvider } from './src/contexts/api';
import { Routes } from './src/routes';

export default function App() {
   const [fontsLoaded] = useFonts({
      font_regular: Montserrat_400Regular,
      font_medium: Montserrat_500Medium,
      font_bold: Montserrat_700Bold
   });

   if(!fontsLoaded) return <AppLoading />

   return(
      <ApiContextProvider>
         <AppContextProvider>
            <StatusBar backgroundColor="#000" style="dark"/>
            <Routes />
         </AppContextProvider>
      </ApiContextProvider>
   );
}