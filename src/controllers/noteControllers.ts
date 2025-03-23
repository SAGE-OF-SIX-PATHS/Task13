import { Request, Response, NextFunction } from 'express';
import {
          getAllNotes,
          getNoteById,
          createNote,
          updateNote,
          deleteNote,
          getNotesByCategoryId,
} from '../services/noteServices';
import { successResponse, errorResponse } from '../utils/apiResponse';

export const listNotes = async (req: Request, res: Response) => {
          try {
                    // Fetch notes only for the authenticated user
                    const notes = await getAllNotes(req.user!._id);
                    successResponse(res, notes, 'Notes fetched successfully');
          } catch (error) {
                    errorResponse(res, 'Error fetching notes');
          }
};

export const getNote = async (req: Request, res: Response) => {
          try {
                    // Fetch note only if it belongs to the authenticated user
                    const note = await getNoteById(req.params.id, req.user!._id);
                    if (!note) {
                              return errorResponse(res, 'Note not found or unauthorized', 404);
                    }
                    successResponse(res, note, 'Note fetched successfully');
          } catch (error) {
                    errorResponse(res, 'Error fetching note');
          }
};

export const addNote = async (req: Request, res: Response) => {
          try {
                    // Associate the note with the authenticated user
                    const noteData = { ...req.body, createdBy: req.user!._id };
                    const note = await createNote(noteData);
                    successResponse(res, note, 'Note created successfully', 201);
          } catch (error) {
                    errorResponse(res, 'Error creating note');
          }
};

export const modifyNote = async (req: Request, res: Response) => {
          try {
                    // Update note only if it belongs to the authenticated user
                    const note = await updateNote(req.params.id, req.body, req.user!._id);
                    if (!note) {
                              return errorResponse(res, 'Note not found or unauthorized', 404);
                    }
                    successResponse(res, note, 'Note updated successfully');
          } catch (error) {
                    errorResponse(res, 'Error updating note');
          }
};

export const removeNote = async (req: Request, res: Response) => {
          try {
                    // Delete note only if it belongs to the authenticated user
                    const note = await deleteNote(req.params.id, req.user!._id);
                    if (!note) {
                              return errorResponse(res, 'Note not found or unauthorized', 404);
                    }
                    successResponse(res, null, 'Note deleted successfully');
          } catch (error) {
                    errorResponse(res, 'Error deleting note');
          }
};

export const listNotesByCategory = async (req: Request, res: Response) => {
          try {
                    // Fetch notes by category only for the authenticated user
                    const notes = await getNotesByCategoryId(req.params.categoryId, req.user!._id);
                    successResponse(res, notes, 'Notes fetched by category successfully');
          } catch (error) {
                    errorResponse(res, 'Error fetching notes by category');
          }
};