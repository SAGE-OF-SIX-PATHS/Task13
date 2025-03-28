import { Request, Response, NextFunction } from 'express';
import { createNoteSchema, updateNoteSchema } from '../schemas/noteSchemas';

interface NoteRequestBody {
          title: string;
          content: string;
          category: string;
}

// For POST /notes (create)
export const validateCreateNote = (
          req: Request<{}, {}, NoteRequestBody>,
          res: Response,
          next: NextFunction
) => {
          const { error } = createNoteSchema.validate(req.body);
          if (error) {
                    res.status(400).json({
                              success: false,
                              errors: error.details.map(d => d.message)
                    });
                    return;
          }
          next();
};

// For PUT /notes/:id (update)
export const validateUpdateNote = (
          req: Request<{ id: string }, {}, NoteRequestBody>,
          res: Response,
          next: NextFunction
) => {
          const { error } = updateNoteSchema.validate(req.body);
          if (error) {
                    res.status(400).json({
                              success: false,
                              errors: error.details.map(d => d.message)
                    });
                    return;
          }
          next();
};