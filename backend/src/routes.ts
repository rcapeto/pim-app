import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import UserController from './controllers/UserController';
import ReservationController from './controllers/ReservationController';

const route = Router();
const upload = multer(uploadConfig);

route.get('');

route.post('/user', upload.array('image'), UserController.create);
route.delete('/user/:id', UserController.delete);
route.get('/users', UserController.index);
route.get('/login', UserController.show);

route.post('/reservation', ReservationController.create);
route.get('/reservations/user/:id', ReservationController.all);
route.delete('/reservations/:id', ReservationController.remove);

export { route };