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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("./db/User");
const app = (0, express_1.default)();
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express_1.default.json());
const conn_1 = require("./db/conn");
(0, conn_1.connectToDb)().catch(console.dir);
app.get("/", (req, res) => {
    res.send("HELLO");
});
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield User_1.User.exists({ email: req.body.email })) {
        res.json({ status: 'error', message: 'User already exists' });
        return;
    }
    else {
        try {
            yield bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.json({ status: 'error', message: 'Error hashing password' });
                    //throw(err);
                }
                else {
                    User_1.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                    });
                    res.json({ status: 'ok' });
                }
            });
        }
        catch (err) {
            res.json({ status: 'error', message: 'Error registering user' });
        }
    }
}));
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(User.findOne(req.body.email));
        const user = yield User_1.User.findOne({ email: req.body.email });
        // console.log('hello')
        // console.log(user)
        const passwordsMatch = yield bcrypt.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordsMatch) {
            res.json({ status: 'error', message: `Invalid email or password` });
        }
        else {
            console.log('Logged in successfully');
            res.json({ status: 'ok', message: `Login successful` });
        }
    }
    catch (err) {
        res.json({ status: 'error', message: `Invalid email or password` });
    }
}));
app.listen(port, () => {
    // connect to db when server starts
    // connectToDb().catch(console.dir);
    console.log(`Server is running on port: ${port}`);
});
