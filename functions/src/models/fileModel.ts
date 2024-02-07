import { object, string, boolean, InferType } from 'yup';

export const fileSchema = object().shape({
    userId: string().required(),
    name: string().required(),
    text: string().required(),
    fileSize: string().required(),
    isFavorite: boolean().default(false),
    isArchive: boolean().default(false),
    isSelected: boolean().default(false),
    isEditingName: boolean().default(false),
});

export type File = InferType<typeof fileSchema>;
