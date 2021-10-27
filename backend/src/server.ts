import express from 'express';
import cors from 'cors';
import path from 'path';

import { port } from './config/server';
import { route } from './routes';
import './database/connection';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
server.use(route);

server.listen(port, callbackListen);

function callbackListen() {
   console.log(`
      =============Server ONLINE==================
      Server is running in port: ${port}
      Click here to open: http://localhost:${port}
      ============================================
   `);
};