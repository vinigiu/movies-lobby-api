"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const winston_1 = __importDefault(require("winston"));
const log = (name, message, options) => {
    try {
        let opt = options;
        let level = name;
        const valids = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];
        if (!valids.includes(name)) {
            level = 'debug';
        }
        const loggerOptions = {
            level,
            format: winston_1.default.format.json(),
            transports: [
                new winston_1.default.transports.File({
                    filename: path_1.default.join(__dirname, '../../../logs', `${name}.log`),
                }),
            ],
        };
        const logger = winston_1.default.createLogger(loggerOptions);
        if (!lodash_1.default.isObject(opt)) {
            opt = { options };
        }
        opt.date = new Date();
        logger.log(level, message, { data: opt });
    }
    catch (error) {
        console.log('@logError:', error);
    }
};
exports.default = log;
