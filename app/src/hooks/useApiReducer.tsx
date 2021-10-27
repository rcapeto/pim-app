import { useReducer } from 'react';

import { ApiContextState, ActionsApi } from '../@types/reducer';

const apiState: ApiContextState = {
   loadingAPI: false
};

const dispatch = (
   state: ApiContextState, 
   action: ActionsApi
) => {
   switch(action.type) {
      case 'TOGGLE_LOADING_API':
         return {
            ...state,
            loadingAPI: !state.loadingAPI
         }
      default: 
         return state;
   }
};

export const useApiReducer = () => useReducer(dispatch, apiState);