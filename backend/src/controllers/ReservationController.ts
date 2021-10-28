import e, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as createCrypt } from 'uuid';

import ReservationModel from '../models/Reservation';

import { Error, ReservationResponse } from '../../@types';
import { showError } from '../utils';
import { 
   getReservations, 
   findReservationWithId, 
   findReservationsWithUserId 
} from '../utils/reservation';
import { getRoomWithId } from '../utils/rooms';


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

      const id = createCrypt();
      const { 
         user_id,
         room_id,
         enter_date,
         exit_date
      } = request.body;

      const reservations = await findReservationsWithUserId(user_id);
      const hasRoomReservation = reservations && 
         Array.isArray(reservations) &&
         reservations.find(res => res['room_id'] === room_id) ? true : false
      ;

      if(hasRoomReservation) {
         errors.push({
            field: '',
            message: 'Has reservation in this room'
         });

         return response.status(400).json({
            errors,
            message: 'This room has reservation already'
         });
      }

      const reservationRepo = getRepository(ReservationModel);
      const reservation = reservationRepo.create({
         id,
         user_id,
         room_id,
         enter_date,
         exit_date,
      });

      try {
         await reservationRepo.save(reservation);
         return response.status(201).json({
            errors,
            data: {
               reservation: {
                  ...reservation,
                  id,
               }
            },
            message: 'Reservation user with success! 😉'
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
   async all(request: Request, response: Response) {
      const { id } = request.params;

      if(!id) {
         return response.status(401).json({
            errors: [
               {
                  message: 'Dont have access'
               }
            ],
            message: 'Fail to show reservations'
         });
      }

      const dbReservations = await getReservations(id);

      const reservations: ReservationResponse[] = [];

      for(const reservation of dbReservations) {
         const room = await getRoomWithId(reservation.room_id);

         if(room) {
            reservations.push({
               reservation,
               room
            });
         }
      }

      return response.status(200).json({ reservations, id });
   },
   async remove(request: Request, response: Response) {
      const { id } = request.params;
      const reservationRepo = getRepository(ReservationModel);

      if(!id) {
         return response.status(401).json({
            errors: [
               {
                  message: 'Dont have access'
               }
            ],
            message: 'Fail to remove the reservation'
         });
      }

      const reservation = await findReservationWithId(id);

      if(reservation) {
         try {
            await reservationRepo.delete(reservation);

            return response.status(200).json({
               errors: [],
               message: 'Reservation deleted with success! 😉'
            });
         } catch(error) {
            showError(error, 'Error[deleteReservation]');
            return response.status(404).json({
               errors: [
                  {
                     message: `Error delete reservation`
                  }
               ],
               message: 'System error [db]'
            }); 
         }
      } else {
         return response.status(404).json({
            errors: [
               {
                  message: `Don't find reservation`
               }
            ],
            message: ''
         });
      }
   }
};