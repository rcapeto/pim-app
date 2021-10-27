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
) => {
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
      default: 
         return state;
   }
};

export const useAppReducer = () => useReducer(dispatch, appState);