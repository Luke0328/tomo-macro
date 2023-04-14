import { connect } from "mongoose";
const db_uri = process.env.ATLAS_URI;

module.exports = {
	run: async function () {
		await connect(`${db_uri}`)
			.then(() => console.log("Connected to db"));
	}
};