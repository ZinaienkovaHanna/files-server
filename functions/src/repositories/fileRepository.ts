import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
} from 'firebase/firestore';
import { ERROR400 } from '../helpers/constants';
import { ERRORS } from '../helpers/error';
import { File } from '../models';
import { db } from '../config';

export const getAllFiles = async () => {
    const querySnapshot = await getDocs(collection(db, 'files'));
    const files: File[] = [];
    querySnapshot.forEach((doc) => {
        files.push(doc.data() as File);
    });

    return files;
};

export const getFilesByUserId = async (userId: string) => {
    const q = query(collection(db, 'files'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw { status: ERROR400.statusCode, message: ERRORS.filesNotExists };

    const files: File[] = [];
    querySnapshot.forEach((doc) => {
        files.push(doc.data() as File);
    });

    return files;
};

export const addNewFile = async (newFile: File) => {
    const docRef = await addDoc(collection(db, 'files'), newFile);

    return docRef.id;
};

export const updateFileById = async (id: string, updatedData: Partial<File>) => {
    const fileRef = doc(db, 'files', id);
    const fileDoc = await getDoc(fileRef);

    if (!fileDoc.exists()) throw { status: ERROR400.statusCode, message: ERRORS.fileNotFound };

    await updateDoc(fileRef, updatedData);
};

export const deleteFileById = async (id: string) => {
    const fileRef = doc(db, 'files', id);
    const fileDoc = await getDoc(fileRef);

    if (!fileDoc.exists()) throw { status: ERROR400.statusCode, message: ERRORS.fileNotFound };

    await deleteDoc(fileRef);
};
