import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import * as product from "./services/product.service.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Constants/constants.js";

const productRouters = Router();

const {ADMIN} = roles 

productRouters.get('/get-products',
    errorHandlerMiddleware(product.getAllProductService)
)

productRouters.use(errorHandlerMiddleware(authenticationMiddlware('admin')))
productRouters.use(authorizationMiddleware([ADMIN]))

productRouters.post('/add-product',
    errorHandlerMiddleware(product.addProductService)
)



export default productRouters