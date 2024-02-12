import { Request, Response } from 'express';
import * as FileRepository from '../repositories';
import { STANDARD } from '../helpers/constants';
import { handleServerError } from '../helpers/error';
import { fileSchema, File } from '../models';

export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const files = await FileRepository.getAllFiles();

        return res.status(STANDARD.SUCCESS).json(files);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const getFilesByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const files = await FileRepository.getFilesByUserId(userId);

        return res.status(STANDARD.SUCCESS).json(files);
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
            fileData: 'fileData',
            fileSize: 'fileData.size',
            isFavorite: false,
        };

        await fileSchema.validate(newFile, { abortEarly: false });

        const fileId = await FileRepository.addNewFile(newFile);

        return res.status(STANDARD.CREATED).json({ id: fileId });
    } catch (error) {
        handleServerError(res, error);
    }
};

export const updateFile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, isFavorite } = req.body;
        const updatedData: Partial<File> = {};

        if (name) updatedData.name = name;
        if (isFavorite) updatedData.isFavorite = isFavorite;

        await FileRepository.updateFileById(id, updatedData);

        return res.status(STANDARD.SUCCESS).json({ message: 'File updated successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await FileRepository.deleteFileById(id);

        return res.status(STANDARD.SUCCESS).json({ message: 'File deleted successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};
