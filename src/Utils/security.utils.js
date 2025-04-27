import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet, { xssFilter } from "helmet";

export const applySecurityMiddleware = (app) => {

    app.use(helmet());

    app.use(ExpressMongoSanitize());

    app.use(xssFilter());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests from this IP, please try again later.'
    });
    app.use(limiter);
}