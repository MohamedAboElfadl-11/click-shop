import { Router } from "express";
import * as profile from "./Services/user.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import * as validators from "../../Validation/Customer/Profile/profile.validation.js";

const customerProfileRouters = Router();

customerProfileRouters.use(errorHandlerMiddleware(authenticationMiddlware('customer')))

customerProfileRouters.get('/get-profile',
    errorHandlerMiddleware(profile.getProfileService)
)

customerProfileRouters.patch('/update-profile',
    validationMiddleware(validators.updateProfileSchema),
    errorHandlerMiddleware(profile.updateProfileService)
)

customerProfileRouters.patch('/change-password',
    errorHandlerMiddleware(profile.changePasswordService)
)

customerProfileRouters.delete('/delete-account',
    errorHandlerMiddleware(profile.deleteAccountService)
)

export default customerProfileRouters;