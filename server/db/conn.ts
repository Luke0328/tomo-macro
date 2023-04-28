import {connect } from "mongoose";
import { IRecipe } from "./Recipe";
import { User } from "./User";

const db_uri = process.env.ATLAS_URI;

// Facade Pattern - simpler interface for performing actions on the database

// connect to mongodb
async function connectToDb() {
	// console.log(db_uri);
	await connect(`${db_uri}`)
		.then(() => console.log(`Connected to Mongodb on ${db_uri}`));
	// addRecipe("luke@gmail.com", {name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12});
	// addRecipe("luke@gmail.com", {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16});
	// updateRecipes("luke@gmail.com", [{name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12}, {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16}]);
}

// check if user exists (for logging in)
async function checkForUser(email: string) {
	const userExists = await User.exists({ email: email });
	if (userExists === null) {
		return false;
	}
	return true;
}

// find user
async function findUser(email: string) {
	try {
		const user = await User.findOne({ email: email });
		return user;
	} catch (e) {
		throw e;
	}
}

// create new user
async function createUser(firstName: string, lastName: string, email: string, pwd: string) {
	try {
		await User.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: pwd,
		})
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

export { connectToDb, checkForUser, findUser, createUser, updateRecipes };
