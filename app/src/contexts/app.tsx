import React, { createContext, useContext, FunctionComponent } from 'react';

import { AppContextValue } from '../@types/context';
import { useAppReducer } from '../hooks/useReducer';
import { User, ReservationResponse } from '../@types/data';

const AppContext = createContext({} as AppContextValue);

export const AppContextProvider: FunctionComponent = ({
   children
}) => {
   const [appState, dispatchApp] = useAppReducer();

   const handleSetUser = (user: User) => {
      dispatchApp({
         type: 'SET_USER',
         params: {
            profile: user
         }
      });
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