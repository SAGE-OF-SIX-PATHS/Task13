import { IAuth, IUser, User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService implements IAuth {
          async register(password: string, email: string, username: string): Promise<{ success: boolean; message: string; user?: IUser }> {
                    try {
                              // Check if the email is already in use
                              const existingUser = await User.findOne({ email });
                              if (existingUser) {
                                        return { success: false, message: 'Email already exists' };
                              }

                              // Hash the password
                              const hashedPassword = await bcrypt.hash(password, 10);

                              // Create a new user
                              const newUser = new User({ email, password: hashedPassword, username });
                              await newUser.save();

                              // Return success message and the new user
                              return { success: true, message: 'Registration successful! Welcome, ' + username + '!', user: newUser };
                    } catch (error) {
                              console.log(error);
                              return { success: false, message: 'Registration failed. Please try again.' };
                    }
          }

          async login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
                    try {
                              // Find the user by email
                              const user = await User.findOne({ email });
                              if (!user) {
                                        return { success: false, message: 'User not found. Please check your email.' };
                              }

                              // Compare the provided password with the hashed password
                              const isPasswordValid = await bcrypt.compare(password, user.password);
                              if (!isPasswordValid) {
                                        return { success: false, message: 'Incorrect password. Please try again.' };
                              }

                              // Generate a JWT token
                              const token = this.generateToken(user._id);

                              // Return success message and the token
                              return { success: true, message: 'Login successful! Welcome back, ' + user.username + '!', token };
                    } catch (error) {
                              console.log(error);
                              return { success: false, message: 'Login failed. Please try again.' };
                    }
          }

          async logout(token: string): Promise<void> {
                    // Invalidate the token (e.g., add it to a blacklist)
                    // Implementation depends on your token invalidation strategy
          }

          async validateToken(token: string): Promise<boolean> {
                    try {
                              const decoded = jwt.verify(token, process.env.JWT_SECRET!);
                              return !!decoded;
                    } catch (error) {
                              return false;
                    }
          }

          private generateToken(userId: string): string {
                    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
          }
}