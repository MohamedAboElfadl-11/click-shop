import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import * as auth from "./Services/auth.brandowner.services.js";
import * as validation from "../../../Validation/Brand Owner/Auth/auth.brandowner.validation.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";

const brandOwnerRouters = Router()

brandOwnerRouters.post('/signup',
    validationMiddleware(validation.brandOwnerSignupSchema),
    errorHandlerMiddleware(auth.brandOwnerSignUpService)
)

brandOwnerRouters.post('/login',
    errorHandlerMiddleware(auth.brandOwnerLoginService)
)

brandOwnerRouters.patch('/verify-email',
    errorHandlerMiddleware(auth.verifyAccountService)
)

brandOwnerRouters.post('/resend-otp',
    errorHandlerMiddleware(auth.resendOtpService)
)
export default brandOwnerRouters;