import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the IUser interface
export interface IUser extends Document {
          _id: string; // Explicitly define _id as a string
          username: string;
          email: string;
          password: string;
          comparePassword(candidatePassword: string): Promise<boolean>;
          createdAt: Date;
          updatedAt: Date;
}

// Define the IAuth interface
export interface IAuth {
          login(email: string, password: string): Promise<string>; // Returns a JWT token
          logout(token: string): Promise<void>;
          validateToken(token: string): Promise<boolean>;
}

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>(
          {
                    username: { type: String, required: true, unique: true },
                    email: { type: String, required: true, unique: true },
                    password: { type: String, required: true },
          },
          { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
          if (!this.isModified('password')) return next();
          this.password = await bcrypt.hash(this.password, 10);
          next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
          return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
export const User = mongoose.model<IUser>('User', UserSchema);