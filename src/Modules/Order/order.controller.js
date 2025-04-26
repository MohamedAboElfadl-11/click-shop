import { Router } from "express";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import * as order from "./Services/order.service.js";
import addressMiddleware from "../../Middlewares/address.middeware.js";

const orderRouters = Router();

orderRouters.use(errorHandlerMiddleware(authenticationMiddlware('customer')))

orderRouters.post('/create-order',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(order.createOrderService)
)

orderRouters.get('/get-orders',
    errorHandlerMiddleware(order.getOrdersService)
)

orderRouters.put('/cancel-order/:orderID',
    errorHandlerMiddleware(order.cancelOrderService)
)

export default orderRouters