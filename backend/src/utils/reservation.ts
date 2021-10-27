import { getRepository } from 'typeorm';

import ReservationModel from '../models/Reservation';
import { showError } from './index';

export const getReservations = async (user_id: string) => {
   const reservationRepo = getRepository(ReservationModel);

   try {
      const reservations = await reservationRepo.find({
         where: `user_id == '${user_id}'`
      });
      
      return reservations;

   } catch(err) {
      showError(err, `Error[getReservations]`);
      return [];
   }
}

export const findReservationWithId = async (id: string) => {
   const reservationRepo = getRepository(ReservationModel);
   
   try {
      const reservation = await reservationRepo.findOne(id);
      return reservation;

   } catch(error) {
      showError(error, `Error[findReservationWithId]`);
      return null;
   }
};

export const findReservationsWithUserId = async (user_id: string) => {
   const reservationRepo = getRepository(ReservationModel);
   
   try {
      const reservation = await reservationRepo.find({
         where: `user_id == '${user_id}'`
      });
      return reservation;

   } catch(error) {
      showError(error, `Error[findReservationWithUserId]`);
      return null;
   }
};