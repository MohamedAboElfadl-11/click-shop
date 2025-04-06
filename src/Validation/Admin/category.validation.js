import Joi from "joi";

export const createCategorySchema = {
    body: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(5).max(300).required(),
        parentCategory: Joi.string().hex().length(24)
    })
}

export const updateCategorySchema = {
    body: Joi.object({
        name: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(300),
        parentCategory: Joi.string().hex().length(24)
    }),
    params: Joi.object({
        categoryId: Joi.string().hex().length(24).required()
    })
}

export const deleteCategorySchema = {
    params: Joi.object({
        categoryId: Joi.string().hex().length(24).required()
    })
}

export const searchCategorySchema = {
    params: Joi.object({
        categoryId: Joi.string().hex().length(24).required()
    })
}

