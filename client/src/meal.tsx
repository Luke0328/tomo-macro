import { FC, useState, useEffect } from "react";


// interfaces for food/macro footer. foods MUST have a name, calories, and pfc values 
interface IFood{
    foodName: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
}

// the macro footer MUST have calories + pfc
interface IMacroFooter {
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
}


// FOOD
// each food has a protein/carb/fat count as well as calorie count


// MEAL
// each meal has several foods
// should be able to add a food to a meal
// the food added can be brand new or something that exists already in the user's recipes
// should be able to edit what foods were in the meal and delete foods from a meal

const meal = () => {

}

const mealsContainer = () => {
    
}

// ADD MEAL BUTTON
// there should be a add meal button to add more meals
const addMealButton = () => {

}

// MACRO FOOTER
// when foods are added/deleted, the day's macros should update
const macroFooter:FC<IMacroFooter> = ({ calories, protein, fat, carbs }) => {
    return (
        <div className="flex">
            <div>Calories: {calories}</div>
            <div className="flex flex-col">
                <div>Protein: {protein}</div>
                <div>Fat: {fat}</div>
                <div>Carbs: {carbs}</div>
            </div>
        </div>
    );
}



