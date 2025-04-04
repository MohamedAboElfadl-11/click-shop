import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import categoryRouters from "../Modules/Admin/Category/category.controller.js"
import addressRouters from "../Modules/Customer/Address/address.controller.js"
import authRouters from "../Modules/Customer/Auth/auth.controller.js"
import profileRouters from "../Modules/Customer/Profile/user.controller.js"


const controllerHandler = (app) => {
    app.use('/auth', authRouters)
    app.use('/profile', profileRouters)
    app.use('/address', addressRouters)
    app.use('/category', categoryRouters)
    app.use(globalErrorHandler)
    app.get('/', async (req, res) => res.status(200).json({ message: 'wellcome to click shop' }))
}

export default controllerHandler