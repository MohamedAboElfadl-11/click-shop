import { Router } from 'express';
import { errorHandlerMiddleware } from '../../Middlewares/errorHandler.middleware.js';
import authenticationMiddlware from '../../Middlewares/authentication.middleware.js';
import * as favorite from './Service/favorite.service.js';

const favoriteRouters = Router();

favoriteRouters.use(errorHandlerMiddleware(authenticationMiddlware('customer')))

favoriteRouters.post('/add-to-favorite/:productID',
    errorHandlerMiddleware(favorite.addToFavoriteService)
)

favoriteRouters.get('/favorite-list',
    errorHandlerMiddleware(favorite.listFavoriteService)
)

favoriteRouters.delete('/remove-from-favorite/:productID',
    errorHandlerMiddleware(favorite.removeFromFavoriteService)
)
export default favoriteRouters