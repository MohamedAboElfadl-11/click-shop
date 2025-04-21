import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import * as product from "./services/product.service.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { imageExtentions, roles } from "../../Constants/constants.js";
import { MulterCloud } from "../../Middlewares/multer.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import * as validation from "../../Validation/Product/product.validation.js";

const productRouters = Router();

const { ADMIN } = roles

productRouters.get('/search',
    errorHandlerMiddleware(product.searchByName)
)

productRouters.use(errorHandlerMiddleware(authenticationMiddlware('admin')))
productRouters.use(authorizationMiddleware([ADMIN]))

productRouters.post('/add-product',
    MulterCloud(imageExtentions).fields([{ name: 'images', maxCount: 3 }]),
    validationMiddleware(validation.addProductValidationSchema),
    errorHandlerMiddleware(product.addProductService)
)

productRouters.patch('/update-product/:productID',
    validationMiddleware(validation.updateProductValidationSchema),
    errorHandlerMiddleware(product.updateProductService)
)

productRouters.delete('/delete-product/:productID',
    errorHandlerMiddleware(product.deleteProductService)
)

export default productRouters