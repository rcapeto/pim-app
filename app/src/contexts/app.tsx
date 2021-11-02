import React, { createContext, useContext, FunctionComponent, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContextValue } from '../@types/context';
import { useAppReducer } from '../hooks/useReducer';
import { User, ReservationResponse } from '../@types/data';
import { asyncStorageConfig } from '../config/system';
import { useAPI } from './api';

const AppContext = createContext({} as AppContextValue);

export const AppContextProvider: FunctionComponent = ({
   children
}) => {
   const [appState, dispatchApp] = useAppReducer();

   const { getReservations, handleRemoveReservation } = useAPI();

   const handleSetUser = async (user: User | null) => {
      dispatchApp({
         type: 'SET_USER',
         params: {
            profile: user
         }
      });
      user && await setUserInDeviceStorage(user);
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
      if(user) {
         handleSetUser(user);
         handleGetReservations();
      }

      dispatchApp({ type: 'TOGGLE_LOADING_APP'});
   };

   const removeReservation = async (reservation_id: string) => {
      try {
         const data = await handleRemoveReservation(reservation_id);

         if(!data.errors.length) {
            dispatchApp({
               type: 'DELETE_RESERVATION',
               params: {
                  id: reservation_id
               }
            });
         }
      } catch(error) {
         console.error({
            error,
            message: 'Erro ao deletar reserva'
         });
      }
   };

   const handleGetReservations = async () => {
      const { user } = appState;

      if(user.profile) {
         const { id } = user.profile;

         const data = await getReservations(id);

         if(data.reservations) {
            handleSetReservations(data.reservations);
         }
      }
   };

   const logout = async () => {
      const { user: userLocation } = asyncStorageConfig;
      await AsyncStorage.removeItem(userLocation);
      await handleSetUser(null);
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
            handleSetUser,
            removeReservation,
            handleGetReservations,
            logout
         }}
      >
         { children }
      </AppContext.Provider>
   );
};

export const useApp = () => useContext(AppContext);