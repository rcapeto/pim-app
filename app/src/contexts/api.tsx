import React, { createContext, useContext, FunctionComponent } from 'react';

import { ApiContextValue } from '../@types/context';
import { useApiReducer } from '../hooks/useApiReducer';
import { UserCreate } from '../@types/data';
import { routes } from '../config/routes';
import { api } from '../config/api';

const ApiContext = createContext({} as ApiContextValue);

export const ApiContextProvider: FunctionComponent = ({
   children
}) => {
   const [apiState, dispatchApi] = useApiReducer();

   const toggleLoadingApi = () => {
      dispatchApi({ type: 'TOGGLE_LOADING_API' });
   };

   const login = async (email: string, password: string) => {
      toggleLoadingApi();

      try {
         const { data } = await api.get(routes.user.get, { 
            headers: {
               email,
               password
            }
         });

         return data;
      } catch(error) {
         console.error(error);
         return {
            message: 'Error[Login]',
            user: null,
            errors: []
         }
      } finally {
         toggleLoadingApi();
      }
   };

   const register = async (userDB: UserCreate) => {
      toggleLoadingApi();

      const formData = new FormData();

      for(const [key, value] of Object.entries(userDB)) {
         if(!(key == 'image')) {
            formData.append(key, String(value));
         } else {
            if(value) {
               formData.append('image', {
                  name: `image_${Date.now()}.jpg`,
                  type: 'image/jpg',
                  uri: value
               } as any);
            }
         }
      }

      try {
         const { data } = await api.post(routes.user.create, formData);
         return data;
      } catch(error) {
         console.error(error);
         return {
            message: 'Error[Register]',
            user: null,
            errors: []
         }
      } finally {
         toggleLoadingApi();
      }
   };

   return(
      <ApiContext.Provider
         value={{
            ...apiState,
            toggleLoadingApi,
            login,
            register
         }}
      >
         { children }
      </ApiContext.Provider>
   );
};

export const useAPI = () => useContext(ApiContext);