import { getRepository } from 'typeorm';

import UserModel from '../models/User';
import { showError } from './index';

type SearchType = 'cpf' | 'email' | 'id';

export const getUserInDB = async (type: SearchType, value: string) => {
   const userRepo = getRepository(UserModel);
   let fieldName = '';

   switch(type) {
      case 'cpf':
         fieldName = 'cpf';
         break;
      case 'email':
         fieldName = 'email';
         break;
      case 'id':
         fieldName = 'id';
         break;
      default:
         fieldName = ''
   }

   try {
      const user = await userRepo.findOne({
         where: `${fieldName} == '${value}'`
      });

      return user;

   } catch(error) {
      showError(error, `Error[getUserInDB]`);
      return null;
   }
};