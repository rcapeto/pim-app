import { useReducer } from 'react';

import { AppContextState, ActionsApp } from '../@types/reducer';

const appState: AppContextState = {
   loadingApp: false,
   signed: false,
   user: {
      profile: null,
      reservations: []
   }
};

const dispatch = (
   state: AppContextState, 
   action: ActionsApp
): AppContextState => {
   switch(action.type) {
      case 'SET_USER':
         return {
            ...state,
            user: {
               ...state.user,
               profile: action.params.profile
            }
         }
      case 'SET_RESERVATIONS':
         return {
            ...state,
            user: {
               ...state.user,
               reservations: action.params.reservations
            }
         }
      case 'SET_SIGNED':
         return {
            ...state,
            signed: action.params.signed
         }
      case 'TOGGLE_LOADING_APP':
         return {
            ...state,
            loadingApp: !state.loadingApp
         }
      case 'DELETE_RESERVATION':
         const { id } = action.params;

         const index = state.user.reservations.findIndex(
            ({ reservation }) => reservation.id == id 
         )

         index >= 0 && 
         state.user.reservations.splice(index, 1);

         return {
            ...state,
            user: {
               ...state.user,
               reservations: state.user.reservations
            }
         }
         
      default: 
         return state;
   }
};

export const useAppReducer = () => useReducer(dispatch, appState);