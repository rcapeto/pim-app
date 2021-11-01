export interface Room {
   name: string;
   id: number;
   description: string;
   image: string;
   price: number;
   images: {url: string;}[];
   infos: string[];
   comments: Comment[];
};

export interface Comment {
   user: string;
   id: number;
   text: string;
}

export interface Reservation {
   room_id: string;
   enter_date: string;
   exit_date: string;
   id: string;
   user_id: string;
};

export type CreateReservation = Omit<Reservation, 'id'>;

export interface User {
   password: string;
   cellphone: string;
   image: string;
   email: string;
   name: string;
   birth_date: string;
   cpf: string;
   id: string;
   credit_card: {
      number: string;
      cvv: string;
      date: string;
   }
};

export interface UserDB {
   password: string;
   cellphone: string;
   image: string;
   email: string;
   name: string;
   birth_date: string;
   cpf: string;
   id: string;
   credit_card: string;
};

export type UserCreate = Partial<UserDB>;

export interface ReservationResponse {
   reservation: Reservation;
   room: Room;
};