import { Schema } from "mongoose";
import { recipeSchema, IRecipe } from "./Recipe"

interface IDateData {
    date: Date,
    meals: Array<IRecipe>,
    total_cals: number,
    total_protein: number,
    total_carbs: number,
    total_fat: number,
}

const dateDataSchema = new Schema<IDateData>({
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

// const DateData = model<IDateData>("DateData", dateDataSchema);

export { IDateData, dateDataSchema };