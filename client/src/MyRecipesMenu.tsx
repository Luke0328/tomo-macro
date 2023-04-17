import { FC, useState, useEffect } from "react";

interface IRecipeBlock {
    recipeName?: string,
    calories?: number,
    protein?: number,
    carbs?: number,
    fats?: number,
}

const MyRecipesMenu:FC<any> = () => {

    const [recipes, setRecipes] = useState<Array<IRecipeBlock>>([]);

    // for testing
    useEffect( () => 
        setRecipes([
            {
                recipeName: "Recipe 1",
                calories: 500,
                protein: 30,
                carbs: 35,
                fats: 15,
            }
        ]
    ), []);

    // turn list of objects to RecipeBlock components to display
    const convertToRecipeBlocks = () => recipes.map(recipe => 
        <RecipeBlock 
            recipeName={recipe.recipeName}
            calories={recipe.calories}
            protein={recipe.protein}
            carbs={recipe.carbs}
            fats={recipe.fats}
        />
    );

    let recipeBlockList = convertToRecipeBlocks();

    function handleNewRecipe() {
        const newRecipes = [
            ...recipes,
            {
                recipeName: `Recipe ${recipes.length + 1}`,
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
            }
        ]

        setRecipes(newRecipes);
        recipeBlockList = convertToRecipeBlocks();
    }

    return(
        <div className="border flex flex-col gap-5 p-3">
            <h1 className="font-bold">My Recipes:</h1>

            {recipeBlockList}

            <button onClick={handleNewRecipe}>New Recipe</button>
        </div>
    );
}

const RecipeBlock:FC<IRecipeBlock> = ({ recipeName, calories, protein, carbs, fats }) => {
    return(
        <div className="flex gap-10">
            <div>
                {recipeName}:
            </div>

            <ul>
                <li>
                    <label>
                        <input type="text" value={calories} className="w-10"/>
                        calories
                    </label>                    
                </li>
                <li>
                    {protein} protein
                </li>
                <li>
                    {carbs} carbohydrates
                </li>
                <li>
                    {fats} fats
                </li>
            </ul>

            <button>Save</button>
        </div>
    );
}

export default MyRecipesMenu;