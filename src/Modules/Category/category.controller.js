import { Router } from 'express'
import * as validation from '../../Validation/Category/category.validation.js';
import * as category from './Service/category.service.js';
import { errorHandlerMiddleware } from '../../Middlewares/errorHandler.middleware.js';
import { authorizationMiddleware } from '../../Middlewares/authorization.middleware.js';
import authenticationMiddlware from '../../Middlewares/authentication.middleware.js';
import { validationMiddleware } from '../../Middlewares/validation.middleware.js';
import { roles } from '../../Constants/constants.js';

const { ADMIN } = roles
const adminCategoryRouters = Router();

adminCategoryRouters.use(errorHandlerMiddleware(authenticationMiddlware("admin")))
adminCategoryRouters.use(authorizationMiddleware([ADMIN]))

adminCategoryRouters.post('/create',
    validationMiddleware(validation.createCategorySchema),
    errorHandlerMiddleware(category.createCategoryService)
)

adminCategoryRouters.patch('/update/:categoryId',
    validationMiddleware(validation.updateCategorySchema),
    errorHandlerMiddleware(category.updateCategoryService)
)

adminCategoryRouters.get('/all-categories',
    errorHandlerMiddleware(category.allCategoriesService)
)

adminCategoryRouters.get('/search/:categoryId',
    validationMiddleware(validation.searchCategorySchema),
    errorHandlerMiddleware(category.searchCategoryService)
)

adminCategoryRouters.delete('/delete/:categoryId',
    validationMiddleware(validation.deleteCategorySchema),
    errorHandlerMiddleware(category.deleteCategoryService)
)

export default adminCategoryRouters