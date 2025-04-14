import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import * as auth from "./Services/auth.brandowner.services.js";
import * as validation from "../../../Validation/Brand Owner/Auth/auth.brandowner.validation.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";

const brandOwnerAuthRouters = Router()

// brand owner signup services
brandOwnerAuthRouters.post('/signup',
    validationMiddleware(validation.brandOwnerSignupSchema),
    errorHandlerMiddleware(auth.brandOwnerSignUpService)
)

// brand owner login 
brandOwnerAuthRouters.post('/login',
    validationMiddleware(validation.brandOwnerLoginSchema),
    errorHandlerMiddleware(auth.brandOwnerLoginService)
)

// verify user account
brandOwnerAuthRouters.patch('/verify-email',
    validationMiddleware(validation.verifyAccountSchema),
    errorHandlerMiddleware(auth.verifyAccountService)
)

// resend otp service
brandOwnerAuthRouters.post('/resend-otp',
    validationMiddleware(validation.resendOtpSchema),
    errorHandlerMiddleware(auth.resendOtpService)
)

// forget password
brandOwnerAuthRouters.post('/forget-password',
    validationMiddleware(validation.forgetPasswordSchema),
    errorHandlerMiddleware(auth.forgetPasswordService)
)

// reset password
brandOwnerAuthRouters.patch('/reset-password',
    validationMiddleware(validation.resetPasswordSchema),
    errorHandlerMiddleware(auth.resetPasswordService)
)
export default brandOwnerAuthRouters;