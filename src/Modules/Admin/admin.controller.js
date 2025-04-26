import { Router } from "express";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Constants/constants.js";
import * as admin from "./Services/admin.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";

const adminRoderRouters = Router()

const { ADMIN } = roles

adminRoderRouters.use(errorHandlerMiddleware(authenticationMiddlware('admin')))
adminRoderRouters.use(authorizationMiddleware([ADMIN]))

adminRoderRouters.get('/manage-order/:orderID',
    errorHandlerMiddleware(admin.manageOrderService)
)

export default adminRoderRouters