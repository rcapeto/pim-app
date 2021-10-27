import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as createCrypt } from 'uuid';

import UserModel from '../models/User';
import { Error } from '../../@types';
import { showError, removeMask } from '../utils';
import { getUserWithCPF } from '../utils/user';
import { renderUser } from '../view/user';

export default {
   async create(request: Request, response: Response) {
      const errors: Error[] = [];
      let hasEmptyField = false;

      Object.keys(request.body).forEach(field => {
         if(!request.body[field]) {
            hasEmptyField = true;
            errors.push({
               field,
               message: `Please fill the ${field} field.`
            });
         }
      });

      if(hasEmptyField) {
         return response.status(201).json({ errors, data: '', message: '' });
      }

      const {
         password,
         cellphone,
         email,
         name,
         birth_date,
         cpf,
         credit_card,
      } = request.body;

      const hasUser = await getUserWithCPF(removeMask(cpf));

      if(hasUser) {
         errors.push({
            field: '',
            message: 'E-mail has already using'
         });

         return response.status(400).json({
            errors,
            message: 'This e-mail has using already'
         });
      }

      const images = request.files as Express.Multer.File[];
      const image = images.length ? images[0].filename : '';

      const id = createCrypt();

      const data = {
         id,
         password,
         cellphone: removeMask(cellphone),
         image,
         email,
         name,
         birth_date,
         cpf: removeMask(cpf),
         credit_card: JSON.stringify(credit_card),
      }

      const userRepo = getRepository(UserModel);
      const user = userRepo.create(data);

      try {
         await userRepo.save(user);

         return response.status(201).json({
            errors,
            data: {
               user: {
                  ...user,
                  id,
               }
            },
            message: 'Create user with success! 😉'
         });
      } catch(error) {
         const message = 'error[createUser]';
         showError(error, message);

         return response.status(400).json({ 
            errors, 
            data: '',
            message, 
         });
      }
   },
   async index(request: Request, response: Response) {
      const userRepo = getRepository(UserModel);

      try {
         const users = await userRepo.find();
         return response.status(200).json({ 
            users,
            errors: [],
            message: 'Users find with success! 😉'
         });

      } catch(error) {
         const message = 'error[allUsers]';
         showError(error, message);

         return response.status(404).json({ 
            message, 
            errors: [
               {
                  message: 'Error show users'
               }
            ]
         });
      }
   },
   async show(request: Request, response: Response) {
      const { email, password } = request.headers;
      const userRepo = getRepository(UserModel);

      try {
         const user = await userRepo.findOne({
            where: `email == '${email}'`
         });
   
         if(user && user.password === password) {
            return response.status(200).json({ 
               user: renderUser(user), 
               errors: [],
               message: 'User find with success! 😉'
            });
         }
      } catch(error) {
         const message = 'error[findUser]';
         showError(error, message);

         return response.status(404).json({ 
            message, 
            errors: [
               {
                  message: 'E-mail or Password incorrect!'
               }
            ]
         });
      }
   },
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const userRepo = getRepository(UserModel);

      const user = await userRepo.findOne(id)
      user && await userRepo.delete(user);

      return res.json('remove');
   }
};