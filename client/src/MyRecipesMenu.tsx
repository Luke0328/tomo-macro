import { FC, useState, useEffect } from "react";

interface IRecipeBlock {
    recipeName: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    isEditing: boolean,
    handleSave: (oldRecipeName: string, newRecipeName: string, newCalories: number, newProtein: number, newCarbs: number, newFats: number) => void,
    handleEdit: (recipeName: string) => void,
    handleDelete: (recipeName: string) => void,
}

interface IRecipeNameInput {
    value: string,
    isEditing: boolean,
    handleChange: (newVal: any) => void,
}

interface IMacroRow {
    labelName: string,
    value: number,
    isEditing: boolean,
    handleChange: (newVal: any) => void,
}

interface ISaveButton {
    oldRecipeName: string,
    localRecipeName : string, 
    localCalories: number,
    localProtein: number, 
    localCarbs: number, 
    localFats: number, 
    handleSave: (oldRecipeName: string, newRecipeName: string, newCalories: number, newProtein: number, newCarbs: number, newFats: number) => void,
}

// menu containing recipes
const MyRecipesMenu:FC<any> = () => {

    // state tracking recipes in the form of objects
    const [recipes, setRecipes] = useState<Array<IRecipeBlock>>([]);
    // state for tracking if Update
    const [updateRecipesDisabled, setUpdateRecipesDisabled] = useState<boolean>(true);

    // get initial data
    useEffect( () => {
        async function getRecipes() {
            try {
                const res = await fetch('http://localhost:8080/api/recipes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                })
                if(!res.ok) {
                    console.log("Failed to get recipes");
                    return;
                }
        
                const data = await res.json();
                console.log(data);
                
                let newRecipes: Array<IRecipeBlock> = [];
                data.forEach((item: any) => {
                    newRecipes.push(
                        {
                            recipeName: item.name,
                            calories: item.cals,
                            protein: item.protein,
                            carbs: item.carbs,
                            fats: item.fat,
                            isEditing: false,
                            handleSave: handleSave,
                            handleEdit: handleEdit,
                            handleDelete: handleDelete,
                        }
                    )
                })
                setRecipes(newRecipes);
            } catch (e) {
                console.error(e);
            }   
        }

        getRecipes();
    }, []);
        // setRecipes([
        //     {
        //         recipeName: "Recipe 1",
        //         calories: 500,
        //         protein: 30,
        //         carbs: 35,
        //         fats: 15,
        //         isEditing: false,
        //         handleSave: handleSave,
        //         handleEdit: handleEdit,
        //         handleDelete: handleDelete,
        //     }
        // ]

    // turn list of objects to RecipeBlock components to render
    const convertToRecipeBlocks = () => recipes.map((recipe, i) => 
        <RecipeBlock 
            key={i}
            recipeName={recipe.recipeName}
            calories={recipe.calories}
            protein={recipe.protein}
            carbs={recipe.carbs}
            fats={recipe.fats}
            isEditing={recipe.isEditing}
            handleSave={handleSave}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );

    // list of recipeBlocks to display
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
                handleSave: handleSave,
                handleEdit: handleEdit,
                handleDelete: handleDelete,
            }
        ]
        setRecipes(newRecipes);
        recipeBlockList = convertToRecipeBlocks();
        setUpdateRecipesDisabled(true);
    }

    // get the index of a recipe from its name
    function getRecipeInd(recipeName: string) {
        for (let i = 0; i < recipes.length; i++) {
            if(recipes[i].recipeName === recipeName) {
                return i;
            }
        }
        return -1;
    }

    // handle edit button click
    function handleEdit(recipeName: string) {
        const recipeInd = getRecipeInd(recipeName);
        const currRecipe = recipes[recipeInd];

        // create recipe with same data but isEditing as true
        const newRecipe = {
            recipeName: currRecipe.recipeName,
            calories: currRecipe.calories,
            protein: currRecipe.protein,
            carbs: currRecipe.carbs,
            fats: currRecipe.fats,
            isEditing: true,
            handleSave: handleSave,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
        }

        // update state with new recipe
        let recipesToEdit = [...recipes];
        recipesToEdit[recipeInd] = newRecipe;
        setRecipes(recipesToEdit);
        recipeBlockList = convertToRecipeBlocks();
        setUpdateRecipesDisabled(true);
    }

    // handle delete button click
    function handleDelete(recipeName: string) {
        const newRecipes = recipes.filter((recipe) => {return recipe.recipeName !== recipeName});
        setRecipes(newRecipes);
        recipeBlockList = convertToRecipeBlocks();
    }

    // handle save button click
    function handleSave(oldRecipeName: string, newRecipeName: string, newCalories: number, newProtein: number, newCarbs: number, newFats: number) {

        const recipeInd = getRecipeInd(oldRecipeName);
        
        // create new updated recipe
        const newRecipe = {
            recipeName: newRecipeName,
            calories: newCalories,
            protein: newProtein,
            carbs: newCarbs,
            fats: newFats,
            isEditing: false,
            handleSave: handleSave,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
        }

        // update state with new recipe
        let recipesToEdit = [...recipes];
        recipesToEdit[recipeInd] = newRecipe;
        setRecipes(recipesToEdit);
        recipeBlockList = convertToRecipeBlocks();
        setUpdateRecipesDisabled(checkRecipesEditingStatus(recipesToEdit));
    }

    function checkRecipesEditingStatus(arr: Array<IRecipeBlock>) {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].isEditing === true) {
                return true;
            }
        }
        return false;
    }

    async function handleUpdateRecipes() {
        try {
            // convert recipes state to objects sent to the backend
            let recipesReq: Array<any> = [];
            recipes.forEach((recipe) => {
                recipesReq.push({
                    name: recipe.recipeName,
                    cals: recipe.calories,
                    protein: recipe.protein,
                    carbs: recipe.carbs,
                    fat: recipe.fats,
                })
            });

            // send post req to backend
            const res = await fetch('http://localhost:8080/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({"recipes": recipesReq}),
            })
            if(!res.ok) {
                console.log("Failed to update recipes");
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <div className="border-r-2 flex flex-col gap-5 p-3 h-full">
            <h1 className="font-bold">My Recipes:</h1>

            {recipeBlockList}

            <div className="flex gap-5 justify-center">
                <button onClick={handleNewRecipe}>New Recipe</button>
                <button onClick={handleUpdateRecipes} disabled={updateRecipesDisabled}>Update Recipes</button>
            </div>
        </div>
    );
}

// each block corresponds to one recipe
const RecipeBlock:FC<IRecipeBlock> = ({ recipeName, calories, protein, carbs, fats, isEditing, handleSave, handleEdit, handleDelete }) => {

    // state used to track input changes locally
    const [localRecipeName, setLocalRecipeName] = useState<string>(recipeName);
    const [localCalories, setLocalCalories] = useState<number>(calories);
    const [localProtein, setLocalProtein] = useState<number>(protein);
    const [localCarbs, setLocalCarbs] = useState<number>(carbs);
    const [localFats, setLocalFats] = useState<number>(fats);

    // handle changes on inputs
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

    // change right side buttons depending on if in edit mode
    let buttons;
    if(isEditing) {
        buttons = 
        <SaveButton 
            oldRecipeName={recipeName}
            localRecipeName={localRecipeName}
            localCalories={localCalories}
            localProtein={localProtein}
            localCarbs={localCarbs}
            localFats={localFats}
            handleSave={handleSave}
        />
    }
    else {
        buttons = 
        <div className="flex flex-col">
            <button
                onClick={() => {handleEdit(localRecipeName)}}
            >
                Edit
            </button>

            <button
                onClick={() => {handleDelete(localRecipeName)}}
            >
                Delete
            </button>
        </div>
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
                        handleChange={handleCalorieChange}
                    />                  
                </li>
                <li key="1">
                    <MacroRow 
                        labelName="protein"
                        value={localProtein}
                        isEditing={isEditing}
                        handleChange={handleProteinChange}
                    />  
                </li>
                <li key="2">
                    <MacroRow 
                        labelName="carbs"
                        value={localCarbs}
                        isEditing={isEditing}
                        handleChange={handleCarbsChange}
                    />   
                </li>
                <li key="3">
                    <MacroRow 
                        labelName="fats"
                        value={localFats}
                        isEditing={isEditing}
                        handleChange={handleFatsChange}
                    />  
                </li>
            </ul>

            <div>
                {buttons}
            </div>
        </div>
    );
}

// input field for recipe name
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

// input field for macros
const MacroRow:FC<IMacroRow> = ({ labelName, value, isEditing, handleChange }) => {
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

// button to save and update parent state
const SaveButton:FC<ISaveButton> = ({ oldRecipeName, localRecipeName, localCalories, localProtein, localCarbs, localFats, handleSave }) => {
    return (
        <button onClick={() => {handleSave(oldRecipeName, localRecipeName, localCalories, localProtein, localCarbs, localFats)}}>Save</button>
    );
}

export default MyRecipesMenu;