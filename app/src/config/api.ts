import axios from 'axios';

import { baseURL } from './routes';

export const api = axios.create({
   baseURL
});

