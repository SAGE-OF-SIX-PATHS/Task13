import { IAuth, IUser, User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const tokenBlacklist = new Set<string>();

export class AuthService implements IAuth {
          // Registration method (not part of IAuth but essential for service)
          async register(
                    password: string,
                    email: string,
                    username: string
          ): Promise<{ success: boolean; message: string; user?: Omit<IUser, 'password'> }> {
                    try {
                              // Validate input
                              if (!password || !email || !username) {
                                        return {
                                                  success: false,
                                                  message: 'All fields are required'
                                        };
                              }

                              // Check password strength
                              if (password.length < 8) {
                                        return {
                                                  success: false,
                                                  message: 'Password must be at least 8 characters'
                                        };
                              }

                              // Check if email or username exists (case insensitive)
                              const existingUser = await User.findOne({
                                        $or: [
                                                  { email: { $regex: new RegExp(`^${email}$`, 'i') } },
                                                  { username: { $regex: new RegExp(`^${username}$`, 'i') } }
                                        ]
                              });

                              if (existingUser) {
                                        const field = existingUser.email.toLowerCase() === email.toLowerCase() ?
                                                  'Email' : 'Username';
                                        return {
                                                  success: false,
                                                  message: `${field} already exists`
                                        };
                              }

                              // Create new user (password will be hashed by pre-save hook)
                              const newUser = new User({
                                        email: email.toLowerCase(), // Store email in lowercase
                                        password,
                                        username
                              });

                              await newUser.save();

                              // Omit password from returned user object
                              const userWithoutPassword = newUser.toObject();
                              delete userWithoutPassword.password;

                              return {
                                        success: true,
                                        message: `Registration successful! Welcome, ${username}!`,
                                        user: userWithoutPassword
                              };
                    } catch (error) {
                              console.error('Registration error:', error);
                              return {
                                        success: false,
                                        message: 'Registration failed due to server error'
                              };
                    }
          }

          // IAuth Interface Methods
          async login(email: string, password: string): Promise<string> {
                    try {
                              if (!email || !password) {
                                        throw new Error('Email and password are required');
                              }

                              // Find user by email (case-sensitive exact match)
                              const user = await User.findOne({ email: email.toLowerCase() });

                              if (!user) {
                                        throw new Error('Authentication failed: User not found');
                              }

                              // Compare passwords
                              const isPasswordValid = await bcrypt.compare(password, user.password);

                              if (!isPasswordValid) {
                                        throw new Error('Authentication failed: Invalid credentials');
                              }

                              // Generate and return JWT token
                              return this.generateToken(user._id.toString());
                    } catch (error) {
                              console.error('Login error:', error);
                              throw error;
                    }
          }

          async logout(token: string): Promise<void> {
                    try {
                              if (!token) {
                                        throw new Error('Token is required');
                              }

                              // Verify token is valid before blacklisting
                              const decoded = this.verifyToken(token);
                              tokenBlacklist.add(token);

                              // Auto-clean blacklist after token expiration
                              setTimeout(() => {
                                        tokenBlacklist.delete(token);
                              }, 60 * 60 * 1000); // 1 hour
                    } catch (error) {
                              console.error('Logout error:', error);
                              throw error;
                    }
          }

          async validateToken(token: string): Promise<boolean> {
                    try {
                              if (!token) return false;
                              if (tokenBlacklist.has(token)) return false;

                              this.verifyToken(token);
                              return true;
                    } catch (error) {
                              return false;
                    }
          }

          // Helper Methods
          private generateToken(userId: string): string {
                    if (!process.env.JWT_SECRET) {
                              throw new Error('JWT_SECRET is not configured');
                    }

                    return jwt.sign(
                              { userId },
                              process.env.JWT_SECRET,
                              {
                                        expiresIn: '1h',
                                        issuer: 'your-app-name',
                                        audience: 'your-app-client'
                              }
                    );
          }

          private verifyToken(token: string): { userId: string } {
                    if (!process.env.JWT_SECRET) {
                              throw new Error('JWT_SECRET is not configured');
                    }

                    return jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
          }

          // Optional: Token refresh functionality
          async refreshToken(oldToken: string): Promise<string> {
                    try {
                              if (!oldToken) throw new Error('Token is required');

                              // Verify old token
                              const { userId } = this.verifyToken(oldToken);

                              // Blacklist old token
                              tokenBlacklist.add(oldToken);

                              // Generate and return new token
                              return this.generateToken(userId);
                    } catch (error) {
                              console.error('Token refresh error:', error);
                              throw error;
                    }
          }
}