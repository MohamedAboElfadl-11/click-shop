import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import * as cart from "./Services/cart.service.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";

const cartRouters = Router();

cartRouters.use(errorHandlerMiddleware(authenticationMiddlware('customer')))

cartRouters.post('/add-to-cart',
    errorHandlerMiddleware(cart.addToCartService)
)

cartRouters.patch('/remove-from-cart',
    errorHandlerMiddleware(cart.removeFromCartService)
)

cartRouters.get('/get-cart',
    errorHandlerMiddleware(cart.getCartService)
)

cartRouters.delete('/delete-cart',
    errorHandlerMiddleware(cart.deleteCartService)
)

export default cartRouters