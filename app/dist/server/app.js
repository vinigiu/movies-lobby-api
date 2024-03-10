"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../libs/errors/AppError"));
const express_1 = __importDefault(require("express"));
const LogProvider_1 = __importDefault(require("../libs/providers/LogProvider"));
const routes_1 = require("../routes");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use('/', routes_1.router);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.log(err);
    (0, LogProvider_1.default)('error', err.message, err.stack);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    });
});
exports.default = app;
