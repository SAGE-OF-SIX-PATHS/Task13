import express from 'express';
import {
          listNotes,
          getNote,
          addNote,
          modifyNote,
          removeNote,
          listNotesByCategory,
} from '../controllers/noteControllers';
import { validateNote } from '../middlewares/validateNote';
import { logger } from '../middlewares/logger'; 

const router = express.Router();

router.use(logger);

// GET /api/notes - List all notes
router.get('/', listNotes);
router.get('/:id', getNote);
router.post('/', addNote);
router.put('/:id', modifyNote);
router.delete('/:id', removeNote);

// GET /api/notes/categories/:categoryId - Get notes by category ID
router.get('/categories/:categoryId', listNotesByCategory);

export default router;