import { FC, useState, useEffect } from "react";

interface IRecipeBlock {
    recipeName: string,
    calories?: number,
    protein?: number,
    carbs?: number,
    fats?: number,
    isEditing?: boolean,
}

interface IRecipeNameInput {
    value: string,
    isEditing?: boolean,
    handleChange: (newVal: any) => void,
}

interface IMacroRow {
    labelName: string,
    value?: number,
    recipeName: string
    isEditing?: boolean,
    handleChange: (newVal: any) => void,
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
            }
        ]
        setRecipes(newRecipes);
        recipeBlockList = convertToRecipeBlocks();
    }

    function handleRecipeNameChange() {

    }

    function handleSave(recipeName:string, field: string, newValue: string) {

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

const RecipeBlock:FC<IRecipeBlock> = ({ recipeName, calories, protein, carbs, fats, isEditing }) => {

    const [localRecipeName, setLocalRecipeName] = useState<string>(recipeName);
    const [localCalories, setLocalCalories] = useState<number | undefined>(calories);
    const [localProtein, setLocalProtein] = useState<number | undefined>(protein);
    const [localCarbs, setLocalCarbs] = useState<number | undefined>(carbs);
    const [localFats, setLocalFats] = useState<number | undefined>(fats);


    function handleCalorieChange(newVal: string) {
        if(newVal === "") {
            setLocalCalories(0);
            return;
        }
        const newValInt = Number.parseInt(newVal);
        if (Number.isNaN(newValInt)) {
            return;
        }
        setLocalCalories(newValInt);
    }

    function handleProteinChange(newVal: string) {
        if(newVal === "") {
            setLocalProtein(0);
            return;
        }
        const newValInt = Number.parseInt(newVal);
        if (Number.isNaN(newValInt)) {
            return;
        }
        setLocalProtein(newValInt);
    }

    function handleCarbsChange(newVal: string) {
        if(newVal === "") {
            setLocalCarbs(0);
            return;
        }
        const newValInt = Number.parseInt(newVal);
        if (Number.isNaN(newValInt)) {
            return;
        }
        setLocalCarbs(newValInt);
    }

    function handleFatsChange(newVal: string) {
        if(newVal === "") {
            setLocalFats(0);
            return;
        }
        const newValInt = Number.parseInt(newVal);
        if (Number.isNaN(newValInt)) {
            return;
        }
        setLocalFats(newValInt);
    }

    return(
        <div className="flex gap-10">
            <div>
                <RecipeNameInput 
                    value={localRecipeName}
                    isEditing={isEditing}
                    handleChange={setLocalRecipeName}
                />
            </div>

            <ul>
                <li key="0">
                    <MacroRow 
                        labelName="calories"
                        value={localCalories}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleChange={handleCalorieChange}
                    />                  
                </li>
                <li key="1">
                    <MacroRow 
                        labelName="protein"
                        value={localProtein}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleChange={handleProteinChange}
                    />  
                </li>
                <li key="2">
                    <MacroRow 
                        labelName="carbohydrates"
                        value={localCarbs}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleChange={handleCarbsChange}
                    />   
                </li>
                <li key="3">
                    <MacroRow 
                        labelName="fats"
                        value={localFats}
                        isEditing={isEditing}
                        recipeName={recipeName}
                        handleChange={handleFatsChange}
                    />  
                </li>
            </ul>

        </div>
    );
}

const RecipeNameInput:FC<IRecipeNameInput> = ({ value, isEditing, handleChange}) => {
    if(isEditing) {
        return(
            <label>
                <input 
                    type="text" 
                    value={value} 
                    className="w-24"
                    onChange={(e) => {handleChange(e.target.value)}}
                />
                :
            </label> 
        );
    }
    return(
        <label>
            <input 
                type="text" 
                value={value} 
                className="w-24"
                disabled={true}
            />
            :
        </label> 
    ); 
}

const MacroRow:FC<IMacroRow> = ({ labelName, value, recipeName, isEditing, handleChange }) => {
    if(isEditing) {
        return (
            <label>
                <input 
                    type="text" 
                    value={value} 
                    className="w-10"
                    onChange={(e) => {handleChange(e.target.value)}}
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

// const SaveButton = ({ handleSave }) => {
//     return (
//         <button>Save</button>
//     );
// }

export default MyRecipesMenu;