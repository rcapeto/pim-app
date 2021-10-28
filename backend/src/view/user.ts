import { UserDB } from '../../@types';

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
      image: `/uploads/${image}`,
      credit_card,
   }
}