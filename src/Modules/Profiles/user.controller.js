import { Router } from "express";
import * as profile from "./Services/user.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import * as validators from "../../Validation/Profile/profile.validation.js";
import { MulterCloud } from "../../Middlewares/multer.middleware.js";
import { imageExtentions } from "../../Constants/constants.js";

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

customerProfileRouters.patch('/upload-profile-pic',
    MulterCloud(imageExtentions).single('profile'),
    errorHandlerMiddleware(profile.uploadProfilePicService)
)

customerProfileRouters.delete('/delete-profile-pic',
    errorHandlerMiddleware(profile.deletProfilepictureService)
)

export default customerProfileRouters;