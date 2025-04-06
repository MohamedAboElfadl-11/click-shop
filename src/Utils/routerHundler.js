import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import authAdminRouters from "../Modules/Admin/Auth/auth.controller.js"
import categoryRouters from "../Modules/Admin/Category/category.controller.js"
import addressRouters from "../Modules/Customer/Address/address.controller.js"
import authCustomerRouters from "../Modules/Customer/Auth/auth.customer.controller.js"
import profileRouters from "../Modules/Customer/Profile/user.controller.js"


const controllerHandler = (app) => {
    app.use('/customer/auth', authCustomerRouters)
    app.use('/customer/profile', profileRouters)
    app.use('/customer/address', addressRouters)
    app.use('/admin/category', categoryRouters)
    app.use('/admin/auth', authAdminRouters)
    app.use(globalErrorHandler)
    app.get('/', async (req, res) => res.status(200).json({ message: 'wellcome to click shop' }))
}

export default controllerHandler