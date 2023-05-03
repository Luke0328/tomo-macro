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
                    <div className="bg-red-400">Protein: {protein}</div>
                    <div className="bg-green-400">Carbs: {carbs}</div>
                    <div className="bg-yellow-200">Fat: {fat}</div>
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
const Meal = (props: { handleMacroUpdate: (calories: number, protein: number, fat: number, carbs: number) => void, mealNumber: number, initialFoods?: IFood}) => {

  const [mealFoods, setMealFoods] = useState<Array<IFood>>([]);

  useEffect(() => {
    console.log("test");
    if (props.initialFoods === undefined) {
      return;
    }
    else {
      setMealFoods([props.initialFoods]);
      props.handleMacroUpdate(props.initialFoods.calories,props.initialFoods.protein,props.initialFoods.fat,props.initialFoods.carbs);
    }
  }, [])

  const addFoodToMeal = (food?: IFood) => {
    if (food === undefined) {
      return;
    }
    else {
      setMealFoods([...mealFoods,food]);
      props.handleMacroUpdate(food.calories,food.protein,food.fat,food.carbs);
    }
    // mealFoods.map((meal) => props.handleMacroUpdate(meal.calories,meal.protein,meal.carbs,meal.fat))
  }

  const deleteFoodFromMeal = (index: number) => {
    const newMealFoods = [...mealFoods];
    const deletedFood = mealFoods[index];
    // props.handleMacroUpdate(-1 * deletedFood.calories, -1 * deletedFood.protein, -1 * deletedFood.fat,-1 * deletedFood.carbs);
    newMealFoods.splice(index, 1);
    setMealFoods(newMealFoods);
    props.handleMacroUpdate(-1 * deletedFood.calories, -1 * deletedFood.protein, -1 * deletedFood.fat,-1 * deletedFood.carbs);
    // mealFoods.map((meal) => props.handleMacroUpdate(meal.calories,meal.protein,meal.fat,meal.carbs))
  };

    return (
        <div className="flex flex-col w-full h-full items-center">
            <h2 className="bg-orange-300 w-full flex justify-center rounded-md text-xl p-1">Meal {props.mealNumber}</h2>
            <FoodList foods={mealFoods} onDeleteFood={deleteFoodFromMeal} />
            <AddFoodButton addFoodToMeal={addFoodToMeal}/>
        </div>
    );
}


const AddFoodButton = (
    props: {
        addFoodToMeal: (food: IFood) => void,
    }) => {
    const [showAddFoodForm, setShowAddFoodForm] = useState(false);
  
    const handleClick = () => {
    //   const appContainer = document.querySelector('#appContainer');
    //   appContainer?.classList.add('opacity-70');
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
    //   props.handleMacroUpdate(calories,protein,carbs,fat);
      props.addFoodToMeal({ 
        foodName: foodName,
        calories: calories,
        protein: protein,
        fat: fat,
        carbs: carbs,})

    //   const appContainer = document.querySelector('#appContainer');
    //   appContainer?.classList.remove('opacity-70');
      setShowAddFoodForm(false);
    };
  
    return (
      <>
        {/* <div>Add Food</div> */}
        {showAddFoodForm && (
          <form className="flex flex-col z-10 w-2/5 h-2/5 " onSubmit={handleSubmit} id="addFoodForm" >
            <label className="flex justify-center w-full">
              Name:
              <input type="text" name="foodName" />
            </label>
            <label className="flex justify-center w-full">
              Calories:
              <input type="number" name="calories" />
            </label>
            <label className="flex justify-center w-full">
              Protein:
              <input type="number" name="protein" />
            </label>
            <label className="flex justify-center w-full">
              Carbs:
              <input type="number" name="carbs" />
            </label>
            <label className="flex justify-center w-full">
              Fat:
              <input type="number" name="fat" />
            </label>
            <button className= "border-2 border-solid border-rose-200 rounded-md p-1"type="submit" form="addFoodForm">Save food</button>
          </form>
        )}
        <button className = "border-2 border-solid border-rose-200 rounded-md p-1 mt-2" onClick={handleClick}>Add Food +</button>

      </>
    );
  };
  

const FoodList = ({ foods, onDeleteFood }: { foods: IFood[]; onDeleteFood: (index: number) => void }) => {
    return (
      <div>
        {/* <h3>Food List</h3> */}
        <ul>
          {foods.map((food, index) => (
            <li key={index}>
              <span>Name: {food.foodName}</span>
              <span>Calories: {food.calories}</span>
              <span>Protein: {food.protein}</span>
              <span>Fat: {food.fat}</span>
              <span>Carbs: {food.carbs}</span>
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
        <button id="addMeal" className = "border-2 border-solid border-rose-200 rounded-md h-10 w-1/6"onClick = {props.addMeal}>Add Meal +</button>
    )
}

const MealsContainer = (props: {meals: any, addMeal: () => void, handleMacroUpdate: (calories: number, protein: number, carbs: number, fat: number) => void}) => {
    // const deleteMeal = (index: number) => {
    //     const newMeals = [...meals];
    //     const deletedMeal = meals[index];
    //     // props.handleMacroUpdate(-1 * deletedMeal.calories, -1 * deletedMeal.protein, -1 * deletedMeal.fat,-1 * deletedMeal.carbs);
    //     deletedMeal.mealFoods
    //     meals.splice(index, 1);
    //     setMeals(newMeals);
    // }
    
      return (
        <div className="flex flex-col h-full w-full p-2 justify-between items-center relative">
            <div className="flex flex-col overflow-auto h-full">
                {props.meals.map((meal: any) => {
                    return <div className="h-full" key={meal.key}>{meal}</div>
                })}
            </div>
            <AddMealButton addMeal={props.addMeal} />
        </div>
      );
    
}

// MACRO FOOTER
// when foods are added/deleted, the day's macros should update
// the state should be kept here
const MacroFooter:FC<IMacroFooter> = ({ calories, protein, fat, carbs }) => {
    return (
        <div className="flex h-10 justify-around w-full mb-2">
            
                <div className="flex h-full justify-between w-24 items-center">
                    <div className="bg-yellow-400 rounded-md text-white p-1">Calories </div>
                    <span className="text-yellow-400 text-xl">{calories}</span>
                </div>

                <div className="flex h-full justify-between w-24 items-center">
                    <div className="bg-red-400 rounded-md text-white p-1">Protein </div>
                    <span className="text-red-400 text-xl">{protein}</span>
                </div>
                <div className="flex h-full justify-between w-24 items-center">
                    <div className="bg-green-400 rounded-md text-white p-1">Fat:</div>
                    <span className="text-green-400 text-xl">{fat}</span>
                </div>

                <div className="flex h-full justify-between w-24 items-center">
                    <div className="bg-blue-400 rounded-md text-white p-1">Carbs:</div>
                    <span className="text-blue-400 text-xl">{carbs}</span>
                </div>
        </div>
    );
}


// CONTAINER for the meals container and macrofooter to controll state
const MealsBlockContainer = () => {
    // const [totalCalories, setTotalCalories] = useState<number>(0);
    // const [totalProtein, setTotalProtein] = useState<number>(0);
    // const [totalFat, setTotalFat] = useState<number>(0);
    // const [totalCarbs, setTotalCarbs] = useState<number>(0);
    const [macros, setMacros] = useState<any> ({cals: 0, protein: 0, fat: 0, carbs: 0});

    const [meals, setMeals] = useState<Array<JSX.Element>>([]);

    // get initial data
    useEffect( () => {
      async function getDateData() {
          try {
              const res = await fetch('http://localhost:8080/api/dateData', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                  },
              })
              if(!res.ok) {
                  console.log("Failed to get date data");
                  return;
              }
      
              const data = await res.json();
              console.log(data);

              // populate meals
              let newMeals: Array<JSX.Element> = [];
              (data[0].meals).forEach((e: any) => {
                const food: IFood = {
                  foodName: "Food",
                  calories: e.cals ? e.cals : 0, 
                  protein: e.protein ? e.protein : 0,
                  carbs: e.carbs ? e.carbs : 0,
                  fat: e.fat ? e.fat: 0,
                };
                const mealComponent = <Meal handleMacroUpdate={handleMacroUpdate} key={meals.length} mealNumber={meals.length+1} initialFoods={food}/>;
                newMeals = [...newMeals, mealComponent];
                setMeals(newMeals);
              });
              setMacros({cals: data[0].total_cals, protein: data[0].total_protein, fat: data[0].total_fat, carbs: data[0].total_carbs});
          } catch (e) {
              console.error(e);
          }   
      }

      getDateData();
    }, []);

    // to update the macro footer
    const handleMacroUpdate = async (calories: number, protein: number, fat: number, carbs: number) => {
        // let newCals = totalCalories + calories;
        // let newProtein = totalProtein + protein;
        // let newFat = totalFat + fat;
        // let newCarbs = totalCarbs + carbs;
        // console.log('1');
        // console.log(totalCalories);

        // setTotalCalories((totalCalories) => totalCalories + calories);
        // setTotalProtein((totalProtein) => totalProtein + protein);
        // setTotalFat((totalFat) => totalFat + fat);
        // setTotalCarbs((totalCarbs) => totalCarbs + carbs);
        setMacros((macros: any) => {return {cals: macros.cals + calories, protein: macros.protein + protein, fat: macros.fat + fat, carbs: macros.carbs + carbs}});
    }

    const addMeal = () => {
      const mealComponent = <Meal handleMacroUpdate={handleMacroUpdate} key={meals.length} mealNumber={meals.length+1}/>;
      setMeals([...meals, mealComponent]);
    }

    return (
        <div className="flex flex-col w-full h-full">
            <MealsContainer meals={meals} addMeal={addMeal} handleMacroUpdate={handleMacroUpdate}/>
            <MacroFooter
                calories={macros.cals}
                protein={macros.protein}
                fat={macros.fat}
                carbs={macros.carbs}
            />
        </div>
    );
}









export default MealsBlockContainer;
