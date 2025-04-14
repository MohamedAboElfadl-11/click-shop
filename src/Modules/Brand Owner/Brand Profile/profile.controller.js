import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import * as profile from "./Services/profile.brand.service.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../../Middlewares/validation.middleware.js";
import * as validation from "../../../Validation/Brand Owner/Brand Profile/brandProfile.validation.js";

const brandProfileRouters = Router()

brandProfileRouters.use(errorHandlerMiddleware(authenticationMiddlware('brandOwner')))

brandProfileRouters.get('/get-profile',
    errorHandlerMiddleware(profile.brandProfileService)
)

brandProfileRouters.patch('/update',
    validationMiddleware(validation.updateBrandProfileSchema),
    errorHandlerMiddleware(profile.updateBrandProfileService)
)

brandProfileRouters.post('/verify-brand',
    validationMiddleware(validation.verifyBrandProfileSchema),
    errorHandlerMiddleware(profile.verifyBrandProfileService)
)

brandProfileRouters.put('/change-password',
    validationMiddleware(validation.changeBrandPasswordSchema),
    errorHandlerMiddleware(profile.changeBrandPasswordService)
)

export default brandProfileRouters;