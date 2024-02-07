import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes';

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api', router);

export const filesServer = onRequest(server);
