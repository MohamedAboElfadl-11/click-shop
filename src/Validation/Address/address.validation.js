import Joi from "joi";

export const addAddressSchema = {
    body: Joi.object({
        street: Joi.string().min(3).max(100).required(),
        city: Joi.string().min(2).max(50).required(),
        country: Joi.string().min(2).max(50).required(),
        userAddress: Joi.string().required()
    })
}

export const updateAddressSchema = {
    body: Joi.object({
        street: Joi.string().min(3).max(100).optional(),
        city: Joi.string().min(2).max(50).optional(),
        country: Joi.string().min(2).max(50).optional(),
    })
}