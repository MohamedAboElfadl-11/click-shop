import { Router } from "express";
import { errorHandlerMiddleware } from "../../../Middlewares/errorHandler.middleware.js";
import * as brand from "./Services/brand.admin.service.js";
import authenticationMiddlware from "../../../Middlewares/authentication.middleware.js";

const manageBrandsRouters = Router()

manageBrandsRouters.use(errorHandlerMiddleware(authenticationMiddlware('admin')))

manageBrandsRouters.post('/verify-brand/:brandID',
    errorHandlerMiddleware(brand.verifyBrandService)
)

manageBrandsRouters.post('/reject-brand/:brandID',
    errorHandlerMiddleware(brand.rejectBrandService)
)

export default manageBrandsRouters