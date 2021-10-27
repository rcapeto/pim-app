import { getRepository } from 'typeorm';

import UserModel from '../models/User';
import { showError } from './index';

export const getUserWithCPF = async (cpf: string) => {
   const userRepo = getRepository(UserModel);

   try {
      const user = await userRepo.findOne({
         where: `cpf == '${cpf}'`
      });

      return user;

   } catch(error) {
      showError(error, `Error[getUserWithCPF]`);
      return null;
   }
};