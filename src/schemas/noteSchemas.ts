import Joi from 'joi';

// Schema for creating a note
export const createNoteSchema = Joi.object({
          title: Joi.string().required().max(100).messages({
                    'string.empty': 'Title cannot be empty',
                    'string.max': 'Title must be less than 100 characters',
          }),
          content: Joi.string().required().messages({
                    'string.empty': 'Content cannot be empty',
          }),
          tags: Joi.array().items(Joi.string()).optional(),
          isPinned: Joi.boolean().optional(),
          createdBy: Joi.string().hex().length(24).required(), // Validate MongoDB ObjectId
          category: Joi.string().hex().length(24).optional(), // Validate MongoDB ObjectId
});

// Schema for updating a note (all fields optional)
export const updateNoteSchema = Joi.object({
          title: Joi.string().max(100).optional(),
          content: Joi.string().optional(),
          tags: Joi.array().items(Joi.string()).optional(),
          isPinned: Joi.boolean().optional(),
          category: Joi.string().hex().length(24).optional(),
}).min(1); // At least one field to update