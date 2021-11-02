import { AppContextState, ApiContextState } from './reducer';
import { User, ReservationResponse, UserCreate, CreateReservation } from './data';
import { 
   ResponseLogin, 
   ResponseRegister, 
   ResponseRooms, 
   CreateReservationResponse, 
   ReservationsResponse,
   ResponseDeleteReservation 
} from './response';

export interface AppContextValue extends AppContextState {
   handleSetUser: (user: User | null) => void;
   handleSetReservations: (reservations: ReservationResponse[]) => void;
   handleSetSigned: (signed: boolean) => void;
   removeReservation: (reservation_id: string) => Promise<void>;
   handleGetReservations: () => Promise<void>;
   logout: () => Promise<void>;
};

export interface ApiContextValue extends ApiContextState {
   login: (email: string, password: string) => Promise<ResponseLogin>;
   toggleLoadingApi: () => void;
   register: (data: UserCreate) => Promise<ResponseRegister>;
   getRooms: () => Promise<ResponseRooms>;
   createReservation: (data: CreateReservation) => Promise<CreateReservationResponse>;
   getReservations: (user_id: string) => Promise<ReservationsResponse>;
   handleRemoveReservation: (id: string) => Promise<ResponseDeleteReservation>;
   updateUser: (user_id: string, data: UserCreate) => Promise<ResponseRegister>;
};