import { Reservation, UserDB, ReservationResponse } from './data';

export interface ResponseLogin {
   user: UserDB | null;
   message: string;
   errors: []
}

export interface ResponseRegister {
   data?: {
      user: UserDB,
   };
   message: string;
   errors: []
}

export interface ResponseRooms {
   errors: [],
   message: '',
   rooms: []
}

export interface CreateReservationResponse {
   errors: [];
   message: string;
   data?: {
      reservation: Reservation
   }
};

export interface ReservationsResponse {
   errors: [];
   message: string;
   reservations?: ReservationResponse[]
};