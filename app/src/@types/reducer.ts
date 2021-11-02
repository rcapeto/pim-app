import { User, ReservationResponse } from './data';

export interface AppContextState {
   user: {
      profile: User | null;
      reservations: ReservationResponse[];
   };
   loadingApp: boolean;
   signed: boolean;
};

export interface ApiContextState {
   loadingAPI: boolean;
};

export type ActionsApp = 
   { type: 'SET_USER', params: { profile: User | null } } |
   { type: 'SET_RESERVATIONS', params: { reservations: ReservationResponse[] } } |
   { type: 'SET_SIGNED', params: { signed: boolean }} | 
   { type: 'TOGGLE_LOADING_APP' } |
   { type: 'DELETE_RESERVATION', params: { id: string }}

export type ActionsApi = { type: 'TOGGLE_LOADING_API' };
