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
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../libs/mongoose/database"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const server = (0, http_1.createServer)(app_1.default);
app_1.default.set('host', process.env.HOST || '0.0.0.0');
app_1.default.set('port', process.env.PORT || 3333);
server.listen(app_1.default.get('port'), app_1.default.get('host'), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Movies server started!: ${app_1.default.get('host')}:${app_1.default.get('port')}`);
}));
const shutDown = () => {
    server.close(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.close();
        process.exit(0);
    }));
};
process.on('beforeExit', shutDown);
process.on('exit', shutDown);
exports.default = app_1.default;
