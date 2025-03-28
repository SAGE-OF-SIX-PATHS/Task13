import express from 'express';
import {
          listNotes,
          getNote,
          addNote,
          modifyNote,
          removeNote,
          listNotesByCategory,
} from '../controllers/noteControllers';
import { validateCreateNote, validateUpdateNote } from '../middlewares/validateNote';
import { logger } from '../middlewares/logger';
import Note from '../models/Note';


const router = express.Router();

router.use(logger);

// GET / - List all notes
router.get('/', listNotes);

// GET /:id - Get a specific note
router.get('/:id', getNote);

// POST / - Create a new note
router.post('/', validateCreateNote, addNote);

// PUT /:id - Update a note
router.put('/:id', validateUpdateNote, modifyNote);

// DELETE /:id - Delete a note
router.delete('/:id', removeNote);

// GET /categories/:categoryId - Get notes by category
router.get('/categories/:categoryId', listNotesByCategory);

export default router;