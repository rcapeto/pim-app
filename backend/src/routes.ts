import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import UserController from './controllers/UserController';
import ReservationController from './controllers/ReservationController';
import RoomController from './controllers/RoomController';

const route = Router();
const upload = multer(uploadConfig);

route.post('/user', upload.array('image'), UserController.create);
route.delete('/user/:id', UserController.delete);
route.get('/users', UserController.index);
route.get('/login', UserController.show);
route.put('/users/:id', upload.array('image'), UserController.update);
route.get('/rooms', RoomController.index);

route.post('/reservation', ReservationController.create);   
route.get('/reservations/user/:id', ReservationController.all);
route.delete('/reservations/:id', ReservationController.remove);

export { route };