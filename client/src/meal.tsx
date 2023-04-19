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
const Food:FC<IFood> = ({ foodName, calories, protein, fat, carbs }) => {
    return (    
        <div className="flex">
            <div className="w-full">{foodName}</div>
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="bg-red-400">{protein}</div>
                    <div className="bg-yellow-200">{fat}</div>
                    <div className="bg-green-400">{carbs}</div>
                </div>
                <div className="bg-blue-400">{calories}</div>
            </div>
        </div>
    );
}

// MEAL
// each meal has several foods
// should be able to add a food to a meal
// the food added can be brand new or something that exists already in the user's recipes
// should be able to edit what foods were in the meal and delete foods from a meal
// the Meal component 
const Meal = (props: { handleMacroUpdate: (calories: number, protein: number, carbs: number, fat: number) => void, mealNumber: number}) => {
    const[mealFoods, setMealFoods] = useState<IFood[]>([]);

    const addFoodToMeal = (food: IFood) => {
        setMealFoods([...mealFoods,food]);
    }

    const deleteFoodFromMeal = (index: number) => {
        const newMealFoods = [...mealFoods];
        const deletedFood = mealFoods[index];
        props.handleMacroUpdate(-1 * deletedFood.calories, -1 * deletedFood.protein, -1 * deletedFood.fat,-1 * deletedFood.carbs);
        newMealFoods.splice(index, 1);
        setMealFoods(newMealFoods);
    };

    return (
        <div>
            <h2>Meal {props.mealNumber}</h2>
            <FoodList foods={mealFoods} onDeleteFood={deleteFoodFromMeal} />
            <AddFoodButton handleMacroUpdate={props.handleMacroUpdate} addFoodToMeal={addFoodToMeal}/>
        </div>
    );
}


const AddFoodButton = (
    props: {
        handleMacroUpdate: (calories: number, protein: number, carbs: number, fat: number) => void,
        addFoodToMeal: (food: IFood) => void,
    }) => {
    const [showAddFoodForm, setShowAddFoodForm] = useState(false);
  
    const handleClick = () => {
      setShowAddFoodForm(true);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const foodName = form.foodName.value;
      const calories = Number(form.calories.value);
      const protein = Number(form.protein.value);
      const carbs = Number(form.carbs.value);
      const fat = Number(form.fat.value);
      props.handleMacroUpdate(calories,protein,carbs,fat);
      props.addFoodToMeal({ 
        foodName: foodName,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs,})
      setShowAddFoodForm(false);
    };

  
    return (
      <div>
        {/* <div>Add Food</div> */}
        <button onClick={handleClick}>Add Food +</button>
        {showAddFoodForm && (
          <form onSubmit={handleSubmit} id="addFoodForm">
            <label>
              Name:
              <input type="text" name="foodName" />
            </label>
            <label>
              Calories:
              <input type="number" name="calories" />
            </label>
            <br />
            <label>
              Protein:
              <input type="number" name="protein" />
            </label>
            <br />
            <label>
              Carbs:
              <input type="number" name="carbs" />
            </label>
            <br />
            <label>
              Fat:
              <input type="number" name="fat" />
            </label>
            <br />
            <button type="submit" form="addFoodForm">Add Food</button>
          </form>
        )}
      </div>
    );
  };
  

const FoodList = ({ foods, onDeleteFood }: { foods: IFood[]; onDeleteFood: (index: number) => void }) => {
    return (
      <div>
        {/* <h3>Food List</h3> */}
        <ul>
          {foods.map((food, index) => (
            <li key={index}>
              <span>Calories: {food.calories}</span>
              <span>Protein: {food.protein}</span>
              <span>Carbs: {food.carbs}</span>
              <span>Fat: {food.fat}</span>
              <button onClick={() => onDeleteFood(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
};


// ADD MEAL BUTTON
// there should be a add meal button to add more meals
const AddMealButton = (props: {addMeal: () => void}) => {
    return (
        <button onClick = {props.addMeal}>Add Meal +</button>
    )
}

const MealsContainer = (props: {handleMacroUpdate: (calories: number, protein: number, carbs: number, fat: number) => void}) => {
    const [meals, setMeals] = useState<Array<JSX.Element>>([]);

    const addMeal = () => {
        const mealComponent = <Meal handleMacroUpdate={props.handleMacroUpdate} key={meals.length} mealNumber={meals.length+1}/>;
        setMeals([...meals, mealComponent]);
    }

    // const deleteMeal = (index: number) => {
    //     const newMeals = [...meals];
    //     const deletedMeal = meals[index];
    //     // props.handleMacroUpdate(-1 * deletedMeal.calories, -1 * deletedMeal.protein, -1 * deletedMeal.fat,-1 * deletedMeal.carbs);
    //     deletedMeal.mealFoods
    //     meals.splice(index, 1);
    //     setMeals(newMeals);
    // }
    
      return (
        <div>
            {meals.map((meal) => {
                // return <div>hi</div>
                return <div key={meal.key}>{meal}</div>
            })}
            <AddMealButton addMeal={addMeal} />
        </div>
      );
    
}



// MACRO FOOTER
// when foods are added/deleted, the day's macros should update
// the state should be kept here
const MacroFooter:FC<IMacroFooter> = ({ calories, protein, fat, carbs }) => {
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


// CONTAINER for the meals container and macrofooter to controll state
const MealsBlockContainer = () => {
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const [totalProtein, setTotalProtein] = useState<number>(0);
    const [totalFat, setTotalFat] = useState<number>(0);
    const [totalCarbs, setTotalCarbs] = useState<number>(0);

    // to update the macro footer
    const handleMacroUpdate = (calories: number, protein: number, carbs: number, fat: number) => {
        let currentCalories = totalCalories;
        let currentProtein = totalProtein;
        let currentFat = totalFat;
        let currentCarbs = totalCarbs;

        currentCalories += calories;
        currentProtein += protein;
        currentFat += fat;
        currentCarbs += carbs;

        setTotalCalories(currentCalories);
        setTotalProtein(currentProtein);
        setTotalFat(currentFat);
        setTotalCarbs(currentCarbs);
    }

    return (
        <div>
        <MealsContainer handleMacroUpdate={handleMacroUpdate}/>
        <MacroFooter
            calories={totalCalories}
            protein={totalProtein}
            fat={totalFat}
            carbs={totalCarbs}
        />
        </div>
    );
}




export default MealsBlockContainer
