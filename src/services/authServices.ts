import { User, IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { IAuth } from '../models/User';

export const registerUser = async (userData: IAuth): Promise<IUser> => {
          const { email, password } = userData;
          const existingUser = await User.findOne({ email });
          if (existingUser) throw new Error('User already exists');
          const user = new User({ email, password });
          return user.save();
};

export const loginUser = async (userData: IAuth): Promise<string> => {
          const { email, password } = userData;
          const user = await User.findOne({ email });
          if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
          return token;
};