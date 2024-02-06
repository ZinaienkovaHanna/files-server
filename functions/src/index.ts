import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World');
});

export const filesServer = onRequest(server);
