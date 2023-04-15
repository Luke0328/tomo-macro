"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateDataSchema = void 0;
const mongoose_1 = require("mongoose");
const Recipe_1 = require("./Recipe");
const dateDataSchema = new mongoose_1.Schema({
    date: Date,
    meals: [Recipe_1.recipeSchema],
    total_cals: {
        type: Number,
        default: 0,
    },
    total_protein: {
        type: Number,
        default: 0,
    },
    total_carbs: {
        type: Number,
        default: 0,
    },
    total_fat: {
        type: Number,
        default: 0,
    },
});
exports.dateDataSchema = dateDataSchema;
