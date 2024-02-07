import express from 'express';
import { getFiles, addFile, getFilesByUserId } from '../controllers/fileController';

const router = express.Router();

router.get('/files', getFiles);
router.post('/files', addFile);
router.get('/files/:userId', getFilesByUserId);

export default router;
