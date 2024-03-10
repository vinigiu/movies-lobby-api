"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(message, statusCode, err = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.err = err;
    }
}
exports.default = AppError;
