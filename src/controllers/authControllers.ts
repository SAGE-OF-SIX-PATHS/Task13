import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authServices';
import { IAuth } from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
          const { email, password } = req.body as IAuth;
          const user = await registerUser({ email, password });
          res.status(201).json({ message: 'User registered successfully', user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
          const { email, password } = req.body as IAuth;
          const token = await loginUser({ email, password });
          res.status(200).json({ message: 'Login successful', token });
};