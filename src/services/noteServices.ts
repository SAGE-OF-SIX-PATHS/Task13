import Note, { INote } from '../models/Note';
import { errorResponse } from '../utils/apiResponse';

export const getAllNotes = async (userId: string) => {
          return await Note.find({ createdBy: userId }).populate('category');
};

export const getNoteById = async (id: string, userId: string) => {
          return await Note.findOne({ _id: id, createdBy: userId }).populate('category');
};

export const createNote = async (noteData: Partial<INote>) => {
          const note = new Note(noteData);
          return await note.save();
};

export const updateNote = async (id: string, noteData: Partial<INote>, userId: string) => {
          return await Note.findOneAndUpdate(
                    { _id: id, createdBy: userId },
                    noteData,
                    { new: true }
          ).populate('category');
};

export const deleteNote = async (id: string, userId: string) => {
          return await Note.findOneAndDelete({ _id: id, createdBy: userId });
};

export const getNotesByCategoryId = async (categoryId: string, userId: string) => {
          return await Note.find({ category: categoryId, createdBy: userId }).populate('category');
};