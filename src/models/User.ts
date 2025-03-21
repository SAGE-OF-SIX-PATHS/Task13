// src/models/User.ts
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
          _id: string; // Explicitly define _id as a string
          username: string;
          email: string;
          password: string;
          comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
          username: { type: String, required: true, unique: true },
          email: { type: String, required: true, unique: true },
          password: { type: String, required: true },
});

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

export const User = mongoose.model<IUser>('User', UserSchema);