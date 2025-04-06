import { Router } from "express";
import * as auth from "./Service/auth.customer.service.js";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";
import * as  validators from "../../../Validation/Customer/Auth/auth.validation.js";

const authCustomerRouters = Router();

authCustomerRouters.post('/signup',
    validationMiddleware(validators.signupSchema),
    errorHandlerMiddleware(auth.signupService)
)

authCustomerRouters.post('/login',
    validationMiddleware(validators.loginSchema),
    errorHandlerMiddleware(auth.loginService),
)

authCustomerRouters.post('/verify-account',
    validationMiddleware(validators.verifyAccountSchema),
    errorHandlerMiddleware(auth.verifyAccountService)
)

authCustomerRouters.post('/forget-password',
    validationMiddleware(validators.forgetPasswordSchema),
    errorHandlerMiddleware(auth.forgetPasswordSeervice)
)

authCustomerRouters.patch('/reset-password',
    validationMiddleware(validators.resetPasswordSchema),
    errorHandlerMiddleware(auth.resetPasswordService)
)

authCustomerRouters.get('/genRefreshToken',
    errorHandlerMiddleware(auth.refreshTokenService)
)

authCustomerRouters.get('/logout',
    errorHandlerMiddleware(authenticationMiddlware()),
    errorHandlerMiddleware(auth.logoutService)
)
export default authCustomerRouters