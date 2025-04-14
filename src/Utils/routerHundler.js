import { globalErrorHandler } from "../Middlewares/errorHandler.middleware.js"
import customerAddressRouters from "../Modules/Address/address.controller.js"
import manageBrandsRouters from "../Modules/Admin/Brand/brand.admin.controller.js"
import adminCategoryRouters from "../Modules/Admin/Category/category.controller.js"
import authAdminRouters from "../Modules/Auth/Admin/auth.controller.js"
import brandOwnerAuthRouters from "../Modules/Auth/Brand Owner/auth.brandowner.controller.js"
import customerAuthRouters from "../Modules/Auth/Customer/auth.customer.controller.js"
import brandProfileRouters from "../Modules/Profiles/Brand/profile.controller.js"
import customerProfileRouters from "../Modules/Profiles/Customer/user.controller.js"


const controllerHandler = (app) => {
    // Customer Routers
    app.use('/customer/auth', customerAuthRouters)
    app.use('/customer/profile', customerProfileRouters)
    app.use('/customer/address', customerAddressRouters)
    // Admin Routers
    app.use('/admin/category', adminCategoryRouters)
    app.use('/admin/auth', authAdminRouters)
    app.use('/admin/brand', manageBrandsRouters)
    // Brand-Owner Routers
    app.use('/brand-owner/auth', brandOwnerAuthRouters)
    app.use('/brand-owner/profile', brandProfileRouters)
    app.use(globalErrorHandler)
    app.get('/', async (req, res) => res.status(200).json({ message: 'wellcome to click shop' }))
}

export default controllerHandler