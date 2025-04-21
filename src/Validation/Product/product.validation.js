import Joi from "joi";

export const addProductValidationSchema = {
    body: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(10).max(1000).required(),
        price: Joi.number().positive().required(),
        stock: Joi.number().integer().min(0).default(0),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        brand: Joi.string().min(2).max(50),
        rating: Joi.number()
    })
};

export const updateProductValidationSchema = {
    body: Joi.object({
        description: Joi.string().min(10).max(1000),
        price: Joi.number().positive(),
        brand: Joi.string().min(2).max(50),
        stock: Joi.number().integer().min(0),
        name: Joi.string().min(2).max(100),
        rating: Joi.number()
    })
};
