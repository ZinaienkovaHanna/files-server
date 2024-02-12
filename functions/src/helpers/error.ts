import { Response } from 'express';
import { ERROR500 } from './constants';

export const handleServerError = (res: Response, error: any) => {
    return res.status(ERROR500.statusCode).json(ERROR500);
};

export const ERRORS = {
    invalidToken: 'Error: Token is invalid.',
    filesNotExists: 'Error: Files not exists',
    fileNotUploaded: 'File not uploaded',
    fileNotFound: 'File not found',
};
