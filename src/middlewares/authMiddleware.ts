import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
          const token = req.header('Authorization')?.replace('Bearer ', '');
          if (!token) throw new Error('Access denied. No token provided.');

          const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
          const user = await User.findById(decoded.userId);
          if (!user) throw new Error('User not found');

          req.user = user;
          next();
};