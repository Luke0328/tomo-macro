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
exports.updateRecipes = void 0;
const User_1 = require("./User");
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
// create new user
function createUser(email, pwd) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield User_1.User.create({ email: email, password: pwd });
            console.log(newUser);
        }
        catch (e) {
            throw e;
        }
    });
}
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
