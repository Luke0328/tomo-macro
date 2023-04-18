import { FC, useState, useEffect } from "react";

interface IRecipeBlock {
    recipeName: string,
    calories?: number,
    protein?: number,
    carbs?: number,
    fats?: number,
    isEditing: boolean,
    handleRecipeChange: (recipeName:string, field: string, newValue: string) => void,
}

interface IMacroRow {
    labelName: string,
    value?: number,
    recipeName: string
    isEditing: boolean,
    handleRecipeChange: (recipeName:string, field: string, newValue: string) => void,
}

const MyRecipesMenu:FC<any> = () => {

    const [recipes, setRecipes] = useState<Array<IRecipeBlock>>([]);

    // get initial data
    useEffect( () => 
        setRecipes([
            {
                recipeName: "Recipe 1",
                calories: 500,
                protein: 30,
                carbs: 35,
                fats: 15,
                isEditing: false,
                handleRecipeChange: handleRecipeChange,
            }
        ]
    ), []);

    // turn list of objects to RecipeBlock components to render
    const convertToRecipeBlocks = () => recipes.map(recipe => 
        <RecipeBlock 
            recipeName={recipe.recipeName}
            calories={recipe.calories}
            protein={recipe.protein}
            carbs={recipe.carbs}
            fats={recipe.fats}
            isEditing={recipe.isEditing}
            handleRecipeChange= {handleRecipeChange}
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
                isEditing: true,
                handleRecipeChange: handleRecipeChange,
            }
        ]
        setRecipes(newRecipes);
        recipeBlockList = convertToRecipeBlocks();
    }

    function handleRecipeChange(recipeName:string, field: string, newValue: string) {

        console.log(newValue);
        let newValueInt = 0;
        if(newValue !== "") {
            newValueInt = parseInt(newValue);
            if (Number.isNaN(newValueInt)) {
                return;
            }
        }

        let recipeNum: number = -1;
        for (let i = 0; i < recipes.length; i++) {
            if(recipes[i].recipeName === recipeName) {
                recipeNum = i;
                break;
            }
        }
        
        // create new updated recipe
        const newRecipe = {
            recipeName: recipes[recipeNum].recipeName,
            calories: field === "calories" ? newValueInt: recipes[recipeNum].calories,
            protein: field === "protein" ? newValueInt: recipes[recipeNum].protein,
            carbs: field === "carbohydrates" ? newValueInt: recipes[recipeNum].carbs,
            fats: field === "fats" ? newValueInt: recipes[recipeNum].fats,
            isEditing: true,
            handleRecipeChange: handleRecipeChange,
        }

        // update state with new recipe
        let recipesToEdit = [...recipes];
        recipesToEdit[recipeNum] = newRecipe;
        setRecipes(recipesToEdit);
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

const RecipeBlock:FC<IRecipeBlock> = ({ recipeName, calories, protein, carbs, fats, isEditing, handleRecipeChange }) => {

    return(
        <div className="flex gap-10">
            <div>
                {recipeName}:
            </div>

            <ul>
                <li key="0">
                    <MacroRow 
                        labelName="calories"
                        value={calories}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleRecipeChange={handleRecipeChange}
                    />                  
                </li>
                <li key="1">
                    <MacroRow 
                        labelName="protein"
                        value={protein}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleRecipeChange={handleRecipeChange}
                    />  
                </li>
                <li key="2">
                    <MacroRow 
                        labelName="carbohydrates"
                        value={carbs}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleRecipeChange={handleRecipeChange}

                    />   
                </li>
                <li key="3">
                    <MacroRow 
                        labelName="fats"
                        value={fats}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleRecipeChange={handleRecipeChange}
                    />  
                </li>
            </ul>

            <button>Save</button>
        </div>
    );
}

const MacroRow:FC<IMacroRow> = ({ labelName, value, recipeName, isEditing, handleRecipeChange }) => {
    if(isEditing) {
        return (
            <label>
                <input 
                    type="text" 
                    value={value} 
                    className="w-10"
                    onChange={(e) => {handleRecipeChange(recipeName, labelName, e.target.value)}}
                />
                {labelName}
            </label>  
        );
    }
    return (
        <label>
            <input 
                type="text" 
                value={value} 
                className="w-10" 
                disabled={true} 
            />
            {labelName}
        </label>  
    );
}

export default MyRecipesMenu;