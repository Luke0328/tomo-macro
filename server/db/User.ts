import { Schema, model } from "mongoose";
import { IRecipe, recipeSchema } from "./Recipe";
import { IDateData, dateDataSchema } from "./DateData";

interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    pwd: string,
    recipes: Array<IRecipe>,
    dataByDate: Array<IDateData>,
}

const userSchema = new Schema<IUser>({
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
    pwd: {
        type: String,
        required: true,
    },
    recipes: {
        type: [recipeSchema],
        default: [],
    },
    dataByDate: {
        type: [dateDataSchema],
        default: [],
    },
});

// TO DO: Recipe decorator -> references the original recipe by id but has modifications

const User = model<IUser>("User", userSchema);

export { IUser, userSchema, User };