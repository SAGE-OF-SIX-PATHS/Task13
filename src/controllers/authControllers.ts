import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authServices';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
          const { email, password, username } = req.body;
          try {
                    const user = await authService.register(password, email, username);
                    res.json(user);
          } catch (error) {
                    res.status(400).json({ message: 'Registration failed' });
          }
}


export const login = async (req: Request, res: Response) => {
          const { email, password } = req.body;
          try {
                    const token = await authService.login(email, password);
                    res.json({ token });
          } catch (error) {
                    res.status(401).json({ message: 'Login failed' });
          }
};

export const logout = async (req: Request, res: Response) => {
          const token = req.headers.authorization?.split(' ')[1];
          if (token) {
                    await authService.logout(token);
          }
          res.json({ message: 'Logged out successfully' });
};