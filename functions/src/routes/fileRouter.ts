import express from 'express';
import { getAllFiles, addFile, getFilesByUserId, deleteFile, updateFile } from '../controllers';

const router = express.Router();

router.get('/files', getAllFiles);
router.get('/files/:userId', getFilesByUserId);
router.post('/files', addFile);
router.delete('/files/:id', deleteFile);
router.patch('/files/:id', updateFile);

export default router;
