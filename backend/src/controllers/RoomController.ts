import { Request, Response } from 'express';

import { rooms } from '../../fake_data';

export default {
   async index(request: Request, response: Response) {
      return response.json({
         rooms,
         message: 'Success',
         errors: []
      });
   }
}