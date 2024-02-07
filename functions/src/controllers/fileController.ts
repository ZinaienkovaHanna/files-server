import { Request, Response } from 'express';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { ERROR400, STANDARD } from '../helpers/constants';
import { ERRORS, handleServerError } from '../helpers/error';
import { fileSchema, File } from '../models';
import { db } from '../config';

export const getFiles = async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'files'));

        const files: File[] = [];

        querySnapshot.forEach((doc) => {
            files.push(doc.data() as File);
        });

        return res.status(200).json(files);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const addFile = async (req: Request, res: Response) => {
    try {
        const { name, text, userId } = req.body;

        const newFile = {
            userId: userId,
            name: name,
            text: text,
            fileSize: 10,
            isFavorite: false,
            isArchive: false,
            isSelected: false,
            isEditingName: false,
        };

        await fileSchema.validate(newFile, { abortEarly: false });

        const docRef = await addDoc(collection(db, 'files'), newFile);

        return res.status(STANDARD.SUCCESS).json({ id: docRef.id });
    } catch (error) {
        handleServerError(res, error);
    }
};

export const getFilesByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const q = query(collection(db, 'files'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) res.status(ERROR400.statusCode).json(ERRORS.filesNotExists);

        const files: File[] = [];

        querySnapshot.forEach((doc) => {
            files.push(doc.data() as File);
        });

        return res.status(STANDARD.SUCCESS).json(files);
    } catch (error) {
        handleServerError(res, error);
    }
};
