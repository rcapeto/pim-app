import { AppContextState, ApiContextState } from './reducer';
import { User, ReservationResponse, UserCreate, CreateReservation } from './data';
import { ResponseLogin, ResponseRegister, ResponseRooms, CreateReservationResponse, ReservationsResponse } from './response';

export interface AppContextValue extends AppContextState {
   handleSetUser: (user: User) => void;
   handleSetReservations: (reservations: ReservationResponse[]) => void;
   handleSetSigned: (signed: boolean) => void;
};

export interface ApiContextValue extends ApiContextState {
   login: (email: string, password: string) => Promise<ResponseLogin>;
   toggleLoadingApi: () => void;
   register: (data: UserCreate) => Promise<ResponseRegister>;
   getRooms: () => Promise<ResponseRooms>;
   createReservation: (data: CreateReservation) => Promise<CreateReservationResponse>;
   getReservations: (user_id: string) => Promise<ReservationsResponse>;
};