import { AppContextState, ApiContextState } from './reducer';
import { User, ReservationResponse } from './data';

export interface AppContextValue extends AppContextState {
   handleSetUser: (user: User) => void;
   handleSetReservations: (reservations: ReservationResponse[]) => void;
   handleSetSigned: (signed: boolean) => void;
};

export interface ApiContextValue extends ApiContextState {
   login: (email: string, password: string) => Promise<void>;
};