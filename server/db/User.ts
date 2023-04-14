import { Schema, model } from "mongoose";
import { IRecipe, recipeSchema } from "./Recipe";
import { IDateData, dateDataSchema } from "./DateData";

interface IUser {
    email: string,
    pwd: string,
    recipes: Array<IRecipe>,
    dataByDate: Array<IDateData>,
}

const userSchema = new Schema<IUser>({
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

// TO DO: Recipe decorator -> references the original recipe but has modifications

export const User = model("user", userSchema);