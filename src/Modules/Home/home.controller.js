import { Router } from "express";
import * as home from "./Service/home.service.js";
import { errorHandlerMiddleware } from "../../Middlewares/errorHandler.middleware.js";

const homeRouters = Router()

homeRouters.get('/search',
    errorHandlerMiddleware(home.searchByName)
)

export default homeRouters
