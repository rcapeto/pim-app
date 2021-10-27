import express from 'express';
import cors from 'cors';

import { port } from './config/server';

const server = express();

server.use(cors());
server.use(express.json());

server.listen(port, callbackListen);

function callbackListen() {
   console.log(`
      Server is running in port: ${port}
      Click here to open: http://localhost:${port}
   `);
};