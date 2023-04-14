import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
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

const dateDataSchema = new Schema({
    date: Date,
    meals: [recipeSchema],
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

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    recipes: {
        type: [recipeSchema],
    },
    dataByDate: {
        type: [dateDataSchema],
    },
});

const User = model("user", userSchema);