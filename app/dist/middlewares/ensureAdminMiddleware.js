"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../libs/errors/AppError"));
const UserModel_1 = require("../libs/mongoose/models/UserModel");
const ensureAdminMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new AppError_1.default("User not authenticated.", 401);
        }
        const user = yield UserModel_1.UserModel.findById(userId).exec();
        if (!user || !user.isAdmin) {
            throw new AppError_1.default("User is not an admin.", 403);
        }
        next();
    }
    catch (error) {
        response.status(error.statusCode || 500).json({ error: error.message });
    }
});
exports.default = ensureAdminMiddleware;
