"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = exports.Genre = exports.MovieModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Genre;
(function (Genre) {
    Genre["Action"] = "Action";
    Genre["Drama"] = "Drama";
    Genre["Comedy"] = "Comedy";
})(Genre || (exports.Genre = Genre = {}));
var Rating;
(function (Rating) {
    Rating["OneStar"] = "1";
    Rating["TwoStars"] = "2";
    Rating["ThreeStars"] = "3";
    Rating["FourStars"] = "4";
    Rating["FiveStars"] = "5";
})(Rating || (exports.Rating = Rating = {}));
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: String, enum: Object.values(Genre), required: true },
    rating: { type: String, enum: Object.values(Rating), required: true },
    streamingLink: { type: String, required: true },
});
const MovieModel = mongoose_1.default.model('Movie', movieSchema);
exports.MovieModel = MovieModel;
