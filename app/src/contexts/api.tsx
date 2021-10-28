import React, { createContext, useContext, FunctionComponent } from 'react';

import { ApiContextValue } from '../@types/context';
import { useApiReducer } from '../hooks/useApiReducer';
import { User, ReservationResponse } from '../@types/data';
import { baseURL, routes } from '../config/routes';

const ApiContext = createContext({} as ApiContextValue);

export const ApiContextProvider: FunctionComponent = ({
   children
}) => {
   const [apiState, dispatchApi] = useApiReducer();

   const toggleLoadingApi = () => {
      dispatchApi({ type: 'TOGGLE_LOADING_API' });
   };

   const login = async (email: string, password: string) => {
      const response = await fetch(`${baseURL}${routes.user.get}`, {
         headers: {
            email,
            password
         }
      });

      const data = await response.json();

      console.log(data);
   };

   return(
      <ApiContext.Provider
         value={{
            ...apiState,
            toggleLoadingApi,
            login,
         }}
      >
         { children }
      </ApiContext.Provider>
   );
};

export const useAPI = () => useContext(ApiContext);