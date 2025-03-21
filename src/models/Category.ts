// src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
          name: string;
          createdAt: Date;
          updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
          {
                    name: { type: String, required: true, unique: true, trim: true },
          },
          { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;