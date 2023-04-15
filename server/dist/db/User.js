"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Recipe_1 = require("./Recipe");
const DateData_1 = require("./DateData");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    recipes: {
        type: [Recipe_1.recipeSchema],
        default: [],
    },
    dataByDate: {
        type: [DateData_1.dateDataSchema],
        default: [],
    },
});
exports.userSchema = userSchema;
// TO DO: Recipe decorator -> references the original recipe by id but has modifications
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
