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
router.get('/', (req, res) => {
          res.send("Note working ");
});
router.get('/api/notes', (req, res) => {
          listNotes(req, res);
});
router.get('/api/notes/:id', (req, res) => {
          getNote(req, res);
});
router.post('/api/notes', (req, res) => {
          addNote(req, res)
});
router.put('/api/notes/:id', (req, res) => {
          modifyNote(req, res)
});
router.delete('/api/notes/:id', (req, res) => {
          removeNote(req, res)
});

// GET /api/notes/categories/:categoryId - Get notes by category ID
router.get('/categories/:categoryId', (req, res) => {
          listNotesByCategory(req, res)
});

export default router;