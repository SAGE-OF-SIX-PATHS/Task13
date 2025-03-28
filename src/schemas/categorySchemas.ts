import Joi from 'joi';

export const categorySchema = Joi.object({
          name: Joi.string().required().max(50),
          createdBy: Joi.string().hex().length(24).required(),
});