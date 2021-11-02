import React, { createContext, useContext, FunctionComponent } from 'react';

import { ApiContextValue } from '../@types/context';
import { useApiReducer } from '../hooks/useApiReducer';
import { UserCreate, CreateReservation, User } from '../@types/data';
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

   const getRooms = async () => {
      toggleLoadingApi();

      try {
         const { data } = await api.get(routes.room.get);
         return data;
      } catch(error) {
         console.error(error);
         return {
            message: 'Error[getRooms]',
            errors: [],
            rooms: []
         }
      } finally {
         toggleLoadingApi();
      }
   };

   const createReservation = async (reservationInfo: CreateReservation) => {
      toggleLoadingApi();

      try {
         const { data } = await api.post(routes.reservation.create, reservationInfo);
         return data;

      } catch(error) {
         console.error(error);
         return {
            message: 'Error[createReservation]',
            errors: [],
         }
      } finally {
         toggleLoadingApi();
      }
   };

   const getReservations = async (user_id: string) => {
      toggleLoadingApi();

      try {
         const { data } = await api.get(routes.reservation.get(user_id));
         return data;

      } catch(error) {
         console.error(error);
         return {
            message: 'Error[getRooms]',
            errors: [],
         }
      } finally {
         toggleLoadingApi();
      }
   };

   const handleRemoveReservation = async (id: string) => {
      toggleLoadingApi();

      try {
         const { data } = await api.delete(routes.reservation.delete(id));
         return data;
      } catch(error) {
         console.error(error);
         return {
            message: 'Error[removeReservation]',
            errors : []
         }
      } finally {
         toggleLoadingApi();
      }
   };

   const updateUser = async (user_id: string, userDB: UserCreate) => {
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
         const { data } = await api.put(routes.user.update(user_id), formData);
         console.log(data);
         return data;
      } catch(error) {
         console.error(error);
         return {
            message: 'Error[UpdateUser]',
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
            register,
            getRooms,
            createReservation,
            getReservations,
            handleRemoveReservation,
            updateUser
         }}
      >
         { children }
      </ApiContext.Provider>
   );
};

export const useAPI = () => useContext(ApiContext);