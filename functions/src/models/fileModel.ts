import { object, string, boolean, InferType } from 'yup';

export const fileSchema = object().shape({
    userId: string().required(),
    name: string().required(),
    text: string().required(),
    fileSize: string().required(),
    fileData: string().required(),
    isFavorite: boolean().default(false).required(),
});

export type File = InferType<typeof fileSchema>;
