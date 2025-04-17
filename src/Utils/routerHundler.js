import ProductModel from "../Database/Models/product.model.js"
import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import customerAddressRouters from "../Modules/Address/address.controller.js"
import authAdminRouters from "../Modules/Auth/Admin/auth.controller.js"
import customerAuthRouters from "../Modules/Auth/Customer/auth.customer.controller.js"
import adminCategoryRouters from "../Modules/Category/category.controller.js"
import productRouters from "../Modules/Products/products.controller.js"
import customerProfileRouters from "../Modules/Profiles/user.controller.js"

const controllerHandler = (app) => {

    // Customer Routers
    app.use('/customer/auth', customerAuthRouters)
    app.use('/customer/profile', customerProfileRouters)
    app.use('/customer/address', customerAddressRouters)

    // Admin Routers
    app.use('/admin/category', adminCategoryRouters)
    app.use('/admin/auth', authAdminRouters)
    app.use('/admin/product', productRouters)
    app.get('/home'), async (req, res) => {
        const products = await ProductModel.find();
        if (!products) return res.status(404).json({ message: 'No products avalibale' })
        res.status(200).json({ products })
    }
    app.use(globalErrorHandler)
}
export default controllerHandler


