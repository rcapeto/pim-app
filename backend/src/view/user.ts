import { UserDB } from '../../@types';
import { base_url } from '../config/server';

export const renderUser = (user: UserDB): UserDB => {
   const { 
      name, cpf, email, birth_date, cellphone, credit_card, id, image
   } = user;

   return {
      password: '',
      email,
      name,
      cpf,
      birth_date,
      cellphone,
      id,
      image: `${base_url}/uploads/${image}`,
      credit_card,
   }
}