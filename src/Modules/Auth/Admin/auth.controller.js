import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import * as admin from "./Services/auth.admin.service.js";

const authAdminRouters = Router()


authAdminRouters.post('/create-admin',
    errorHandlerMiddleware(admin.createAdminService)
)

authAdminRouters.post('/login',
    errorHandlerMiddleware(admin.loginAdminService)
)
export default authAdminRouters