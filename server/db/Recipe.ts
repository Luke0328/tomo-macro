import { Schema, model } from "mongoose";

interface IRecipe {
    name: string,
    cals: number,
    protein: number,
    carbs: number,
    fat: number,
}

const recipeSchema = new Schema<IRecipe>({
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

export { IRecipe, recipeSchema };