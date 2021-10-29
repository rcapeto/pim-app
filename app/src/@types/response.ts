import { UserDB } from './data';

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