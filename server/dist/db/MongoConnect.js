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
class MongoConnection {
    constructor() {
        // Private constructor to prevent instantiation outside of the class
        this.db_uri = process.env.ATLAS_URI;
    }
    static getInstance() {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }
    connectToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongoose_1.connect)(`${this.db_uri}`)
                .then(() => console.log(`Connected to Mongodb on ${this.db_uri}`))
                .catch((error) => console.error(`Error connecting to Mongodb: ${error}`));
        });
    }
}
exports.default = MongoConnection;
