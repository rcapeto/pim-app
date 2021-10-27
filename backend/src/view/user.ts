import { UserDB, User } from '../../@types';

export const renderUser = (user: UserDB): User => {
   const { 
      name, cpf, email, birth_date, cellphone, credit_card, id, image
   } = user;

   const creditCard = JSON.parse(credit_card);

   return {
      password: '',
      email,
      name,
      cpf,
      birth_date,
      cellphone,
      id,
      image: `/uploads/${image}`,
      credit_card: {
         number: creditCard.number,
         cvv: creditCard.cvv,
         date: creditCard.date
      }
   }
}