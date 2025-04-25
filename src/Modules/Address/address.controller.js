import { Router } from "express";
import * as address from "./Services/address.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";
import authenticationMiddlware from "../../Middlewares/authentication.middleware.js";
import addressMiddleware from "../../Middlewares/address.middeware.js";

const customerAddressRouters = Router()

customerAddressRouters.use(errorHandlerMiddleware(authenticationMiddlware('customer')))

customerAddressRouters.post('/add-address',
    errorHandlerMiddleware(address.addAddressServices)
)

customerAddressRouters.get('/get-all-addresses',
    errorHandlerMiddleware(address.getAllAddresses)
)

customerAddressRouters.get('/get-address',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.getAddress)
)

customerAddressRouters.patch('/update-address',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.updateAddress)
)

customerAddressRouters.delete('/delete-address',
    errorHandlerMiddleware(addressMiddleware()),
    errorHandlerMiddleware(address.deleteAddress)
)

export default customerAddressRouters