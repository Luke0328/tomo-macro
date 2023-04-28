// import {connect } from "mongoose";
import { IRecipe } from "./Recipe";
import { User } from "./User";


// check if user exists (for logging in)
async function checkForUser(email: string) {
	const userExists = await User.exists({ email: email });
	if (userExists === null) {
		return false;
	}
	return true;
}

// create new user
async function createUser(email: string, pwd: string) {
	try {
		const newUser = await User.create({ email: email, password: pwd });
		console.log(newUser);
	} catch (e: any) {
		throw e;
	}
}

// add new recipe to user
async function addRecipe(email: string, recipe: IRecipe) {
	try {
		const user: any = await User.where("email").equals(email);
		user[0].recipes.push(recipe);
		await user[0].save();
		// console.log(user);
	} catch (e: any) {
		throw e;
	}
}

// modify recipes from user
async function updateRecipes(email: string, recipes: Array<IRecipe>) {
	try {
		const user: any = await User.where("email").equals(email);
		user[0].recipes = [];
		recipes.forEach((recipe) => {
			user[0].recipes.push(recipe);
		});
		await user[0].save();
		// console.log(user);
	} catch (e: any) {
		throw e
	}
}

// get data associated with date

// add meal to date
// edit meal on date
// delete meal from date

export { updateRecipes };
