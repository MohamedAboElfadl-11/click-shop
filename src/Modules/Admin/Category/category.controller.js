import { Router } from 'express'
import * as category from './Service/category.service.js';
import { errorHandlerMiddleware } from '../../../Middlewares/errorHandler.middleware.js';
import authenticationMiddlware from '../../../Middlewares/authentication.middleware.js';
import { authorizationMiddleware } from '../../../Middlewares/authorization.middleware.js';
import { roles } from '../../../Constants/constants.js';
import { validationMiddleware } from '../../../Middlewares/validation.middleware.js';
import * as validation from '../../../Validation/Admin/category.validation.js';

const { ADMIN, SUPER_ADMIN } = roles
const categoryRouters = Router();

categoryRouters.use(errorHandlerMiddleware(authenticationMiddlware()))
categoryRouters.use(authorizationMiddleware([ADMIN, SUPER_ADMIN]))

categoryRouters.post('/create',
    validationMiddleware(validation.createCategorySchema),
    errorHandlerMiddleware(category.createCategoryService)
)

categoryRouters.patch('/update/:categoryId',
    validationMiddleware(validation.updateCategorySchema),
    errorHandlerMiddleware(category.updateCategoryService)
)

categoryRouters.get('/all-categories',
    errorHandlerMiddleware(category.allCategoriesService)
)

categoryRouters.get('/search/:categoryId',
    validationMiddleware(validation.searchCategorySchema),
    errorHandlerMiddleware(category.searchCategoryService)
)

categoryRouters.delete('/delete/:categoryId',
    validationMiddleware(validation.deleteCategorySchema),
    errorHandlerMiddleware(category.deleteCategoryService)
)

export default categoryRouters