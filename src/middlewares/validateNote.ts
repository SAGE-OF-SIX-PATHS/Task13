import { Request, Response, NextFunction } from 'express';

export const validateNote = (req: Request, res: Response, next: NextFunction) => {
          const { title, content } = req.body;

          // Check if title and content are provided
          if (!title || !content) {
                    return res.status(400).json({ message: 'Title and content are required' });
          }

          // Check if title and content are strings
          if (typeof title !== 'string' || typeof content !== 'string') {
                    return res.status(400).json({ message: 'Title and content must be strings' });
          }

          // If validation passes, proceed to the next middleware or route handler
          next();
};