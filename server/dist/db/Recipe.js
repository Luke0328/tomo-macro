"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeSchema = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    cals: {
        type: Number,
        default: 0,
    },
    protein: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
});
exports.recipeSchema = recipeSchema;
