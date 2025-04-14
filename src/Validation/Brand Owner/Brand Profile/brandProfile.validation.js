import Joi from "joi"

export const updateBrandProfileSchema = {
    bofy: Joi.object({
        brandName: Joi.string().min(2).max(100),
        brandType: Joi.string().min(2).max(50),
        address: Joi.string().min(5).max(200),
        city: Joi.string().min(2).max(100),
        country: Joi.string().min(2).max(100),
        phone: Joi.string().pattern(/^[0-9]{6,15}$/)
    })
}


export const verifyBrandProfileSchema = {
    body: Joi.object({
        taxID: Joi.string().required().messages({
            'any.required': 'taxID is required'
        }),
        companyRegistrationNumber: Joi.string().required().messages({
            'any.required': 'companyRegistrationNumber is required'
        })
    })
}


export const changeBrandPasswordSchema = {
    body: Joi.object({
        oldPassword: Joi.string().min(8).max(30).required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/
        ).messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
        newPassword: Joi.string().min(8).max(30).required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/
        ).messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
        confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
            "any.only": "Passwords do not match"
        }),
    })
}