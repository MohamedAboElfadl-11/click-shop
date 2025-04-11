import Joi from 'joi';

export const brandOwnerSignupSchema = {
    body: Joi.object({
        fullName: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
        password: Joi.string().min(8).max(30).required().pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/
        ).messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 30 characters"
        }),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
            "any.only": "Passwords do not match"
        }),
        brandName: Joi.string().min(3).max(100).required(),
        brandType: Joi.string().required(),
        country: Joi.string().min(3).max(50).required(),
        city: Joi.string().min(3).max(50),
        address: Joi.string().min(5).max(255),
        companyRegistrationNumber: Joi.string().alphanum().max(50),
        // taxID: Joi.string().alphanum().min(8).max(15),
        agreedToTerms: Joi.boolean(),
    })
}