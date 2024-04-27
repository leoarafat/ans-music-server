"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = void 0;
class NotFoundHandler {
    static handle(req, res, next) {
        res.status(404).json({
            success: false,
            message: 'Not Found',
            errorMessages: [
                {
                    path: req.originalUrl,
                    message: 'API Not Found',
                },
            ],
        });
        next();
    }
}
exports.NotFoundHandler = NotFoundHandler;
