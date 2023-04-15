import {connect } from "mongoose";
import { IRecipe } from "./Recipe";
import { User } from "./User";

const db_uri = process.env.ATLAS_URI;

// connect to mongodb
async function connectToDb() {
	await connect(`${db_uri}`)
		.then(() => console.log("Connected to Mongodb"));

	// createUser("test@gmail.com", "abcdefg");
	// checkForUser("test@gmail.com")
	// 	.then((b) => console.log("User exists is " + b));
	addRecipe("test@gmail.com", {name: "food"});
}

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
		const newUser = await User.create({ email: email, pwd: pwd });
		console.log(newUser);
	} catch (e: any) {
		console.log(e.message);
	}
}

// add new recipe to user
async function addRecipe(email: string, recipe: IRecipe) {
	try {
		const user: any = await User.where("email").equals(email);
		user[0].recipes.push(recipe);
		await user[0].save();
		console.log(user);
	} catch (e: any) {
		console.log(e.message);
	}
}

// modify recipe from user

// delete recipe from user

// get data associated with date

// add meal to date
// edit meal on date
// delete meal from date

export { connectToDb };