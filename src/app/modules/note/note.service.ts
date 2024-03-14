import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { INote } from './note.interface';
import { Note } from './note.model';

const insertIntoDB = async (payload: INote): Promise<INote> => {
  return await Note.create(payload);
};
const notes = async () => {
  return await Note.find({});
};
const singleNote = async (id: string) => {
  const checkNote = await Note.findById(id);
  if (!checkNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return await Note.findById(id);
};
const deleteNote = async (id: string) => {
  const checkNote = await Note.findById(id);
  if (!checkNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return await Note.findByIdAndDelete(id);
};
const updateNote = async (id: string, payload: Partial<INote>) => {
  const checkNote = await Note.findById(id);
  if (!checkNote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  const { ...noteData } = payload;
  const result = await Note.findOneAndUpdate({ _id: id }, noteData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const noteService = {
  insertIntoDB,
  notes,
  singleNote,
  deleteNote,
  updateNote,
};
