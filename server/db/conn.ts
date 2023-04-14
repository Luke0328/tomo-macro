import { connect } from "mongoose";
const db_uri = process.env.ATLAS_URI;

module.exports = {
	// connect to mongodb
	run: async function () {
		await connect(`${db_uri}`)
			.then(() => console.log("Connected to db"));
	}
	// check if user exists (for logging in)
	// create new user

	// add new recipe to user
	// modify recipe from user
	// delete recipe from user

	// get data associated with date

	// add meal to date
	// edit meal on date
	// delete meal from date

};