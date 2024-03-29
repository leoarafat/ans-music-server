"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errors = [
        { path: error.path, message: 'Invalid Id' },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'CastError',
        errorMessages: errors,
    };
};
exports.handleCastError = handleCastError;
