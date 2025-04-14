import { Router } from "express";
import * as auth from "./Service/auth.customer.service.js";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";
import * as  validators from "../../../Validation/Auth/auth.validation.js";

const customerAuthRouters = Router();

customerAuthRouters.post('/signup',
    validationMiddleware(validators.signupSchema),
    errorHandlerMiddleware(auth.signupService)
)

customerAuthRouters.post('/login',
    validationMiddleware(validators.loginSchema),
    errorHandlerMiddleware(auth.loginService),
)

customerAuthRouters.post('/verify-account',
    validationMiddleware(validators.verifyAccountSchema),
    errorHandlerMiddleware(auth.verifyAccountService)
)

customerAuthRouters.post('/resend-otp',
    errorHandlerMiddleware(auth.resendOtpService)
)

customerAuthRouters.post('/forget-password',
    validationMiddleware(validators.forgetPasswordSchema),
    errorHandlerMiddleware(auth.forgetPasswordSeervice)
)

customerAuthRouters.patch('/reset-password',
    validationMiddleware(validators.resetPasswordSchema),
    errorHandlerMiddleware(auth.resetPasswordService)
)

customerAuthRouters.get('/genRefreshToken',
    errorHandlerMiddleware(auth.refreshTokenService)
)

customerAuthRouters.get('/logout',
    errorHandlerMiddleware(authenticationMiddlware('customer')),
    errorHandlerMiddleware(auth.logoutService)
)
export default customerAuthRouters