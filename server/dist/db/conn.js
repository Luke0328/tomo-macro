"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const db_uri = process.env.ATLAS_URI;
// Facade Pattern - simpler interface for performing actions on the database
class DbFacade {
    constructor() { }
    // connect to mongodb
    static connectToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(db_uri);
            yield (0, mongoose_1.connect)(`${db_uri}`)
                .then(() => console.log(`Connected to Mongodb on ${db_uri}`));
            // addRecipe("luke@gmail.com", {name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12});
            // addRecipe("luke@gmail.com", {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16});
            // updateRecipes("luke@gmail.com", [{name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12}, {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16}]);
        });
    }
    // check if user exists (for logging in)
    static checkForUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield User_1.User.exists({ email: email });
            if (userExists === null) {
                return false;
            }
            return true;
        });
    }
    // find user
    static findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email: email });
                return user;
            }
            catch (e) {
                throw e;
            }
        });
    }
    // create new user
    static createUser(firstName, lastName, email, pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: pwd,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
    // add new recipe to user
    static addRecipe(email, recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.where("email").equals(email);
                user[0].recipes.push(recipe);
                yield user[0].save();
                // console.log(user);
            }
            catch (e) {
                throw e;
            }
        });
    }
    // modify recipes from user
    static updateRecipes(email, recipes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.where("email").equals(email);
                user[0].recipes = [];
                recipes.forEach((recipe) => {
                    user[0].recipes.push(recipe);
                });
                yield user[0].save();
                // console.log(user);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = DbFacade;
