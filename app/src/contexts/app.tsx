import React, { createContext, useContext, FunctionComponent, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContextValue } from '../@types/context';
import { useAppReducer } from '../hooks/useReducer';
import { User, ReservationResponse } from '../@types/data';
import { asyncStorageConfig } from '../config/system';

const AppContext = createContext({} as AppContextValue);

export const AppContextProvider: FunctionComponent = ({
   children
}) => {
   const [appState, dispatchApp] = useAppReducer();

   const handleSetUser = async (user: User) => {
      dispatchApp({
         type: 'SET_USER',
         params: {
            profile: user
         }
      });
      await setUserInDeviceStorage(user);
      handleSetSigned(!!user);
   };

   const handleSetReservations = (reservations: ReservationResponse[]) => {
      dispatchApp({
         type: 'SET_RESERVATIONS',
         params: {
            reservations
         }
      });
   };

   const handleSetSigned = (signed: boolean) => {
      dispatchApp({
         type: 'SET_SIGNED',
         params: {
            signed
         }
      });
   };

   const setUserInDeviceStorage = async (user: User) => {
      const { user: userLocation } = asyncStorageConfig;
      await AsyncStorage.setItem(userLocation, JSON.stringify(user));
   };
   const getUserInDeviceStorage = async (): Promise<User | null> => {
      const { user: userLocation } = asyncStorageConfig;
      const data = await AsyncStorage.getItem(userLocation);
      return data ? JSON.parse(data) : null;
   };
   
   const initializeApp = async () => {
      dispatchApp({ type: 'TOGGLE_LOADING_APP'});

      const user = await getUserInDeviceStorage();
      user && handleSetUser(user);

      dispatchApp({ type: 'TOGGLE_LOADING_APP'});
   };

   useEffect(() => {
      initializeApp();
   }, []);

   return(
      <AppContext.Provider
         value={{
            ...appState,
            handleSetReservations,
            handleSetSigned,
            handleSetUser
         }}
      >
         { children }
      </AppContext.Provider>
   );
};

export const useApp = () => useContext(AppContext);