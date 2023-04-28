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
exports.updateRecipes = exports.createUser = exports.findUser = exports.checkForUser = exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const db_uri = process.env.ATLAS_URI;
// Facade Pattern - simpler interface for performing actions on the database
// connect to mongodb
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(db_uri);
        yield (0, mongoose_1.connect)(`${db_uri}`)
            .then(() => console.log(`Connected to Mongodb on ${db_uri}`));
        // addRecipe("luke@gmail.com", {name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12});
        // addRecipe("luke@gmail.com", {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16});
        // updateRecipes("luke@gmail.com", [{name: "Pasta", cals: 500, protein: 30, carbs: 40, fat: 12}, {name: "Sandwich", cals: 550, protein: 25, carbs: 45, fat: 16}]);
    });
}
exports.connectToDb = connectToDb;
// check if user exists (for logging in)
function checkForUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield User_1.User.exists({ email: email });
        if (userExists === null) {
            return false;
        }
        return true;
    });
}
exports.checkForUser = checkForUser;
// find user
function findUser(email) {
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
exports.findUser = findUser;
// create new user
function createUser(firstName, lastName, email, pwd) {
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
exports.createUser = createUser;
// add new recipe to user
function addRecipe(email, recipe) {
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
function updateRecipes(email, recipes) {
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
exports.updateRecipes = updateRecipes;
