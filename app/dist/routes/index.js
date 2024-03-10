"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const api_1 = require("./api");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/', api_1.apiRouter);
