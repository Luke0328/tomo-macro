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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express_1.default.json());
const MongoConnect_1 = __importDefault(require("./db/MongoConnect"));
const conn_1 = __importDefault(require("./db/conn"));
const mongoConnection = MongoConnect_1.default.getInstance();
mongoConnection.connectToDb().catch(console.dir);
app.get("/", (req, res) => {
    res.send("HELLO");
});
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    if (yield conn_1.default.checkForUser(req.body.email)) {
        res.json({ status: 'error', message: 'User already exists' });
        return;
    }
    else {
        try {
            yield bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(424).json({ status: 'error', message: 'Error hashing password' });
                    //throw(err);
                }
                else {
                    conn_1.default.createUser(req.body.firstName, req.body.lastName, req.body.email, hash);
                    res.status(201).json({ status: 'ok' });
                }
            });
        }
        catch (err) {
            res.status(424).json({ status: 'error', message: 'Error registering user' });
        }
    }
}));
// endpoint for testing authenticating token
// app.get('/test_login', authenticateToken, (req, res) => {
// 	console.log(req.body);
// 	res.json("SUCCESS");
// })
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield conn_1.default.findUser(req.body.email);
        const passwordsMatch = yield bcrypt.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordsMatch) {
            return res.status(401).json({ status: 'error', message: `Invalid email or password` });
        }
        else {
            console.log('Logged in successfully');
            // res.status(200).json({status: 'ok', message: `Login successful`});
        }
    }
    catch (err) {
        return res.status(401).json({ status: 'error', message: `Invalid email or password` });
    }
    // serialize body as jwt
    const accessToken = jsonwebtoken_1.default.sign(req.body, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
    res.status(201).json({ status: 'ok', accessToken: accessToken });
}));
// get endpoint for user's recipes
app.get('/api/recipes', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("get");
    try {
        const user = yield conn_1.default.findUser(req.body.user.email);
        // console.log(user);
        res.status(200).json(user.recipes);
    }
    catch (e) {
        console.error(e);
        res.status(400);
    }
}));
// post endpoint for updating user's recipes
app.post('/api/recipes', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("modify recipes");
    // console.log(req);
    try {
        yield conn_1.default.updateRecipes(req.body.user.email, req.body.recipes);
        res.status(201);
    }
    catch (e) {
        console.error(e);
        res.status(400);
    }
}));
// get endpoint for user's dateData (meals)
app.get('/api/dateData', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get dateData");
    yield conn_1.default.updateDateDate(req.body.user.email, [{ date: new Date(), meals: [{ name: "Meal 1", cals: 100, protein: 30, carbs: 50, fat: 20 }], total_cals: 100, total_protein: 30, total_carbs: 50, total_fat: 20 }]);
    try {
        const user = yield conn_1.default.findUser(req.body.user.email);
        console.log(user.dataByDate);
        res.status(200).json(user.dataByDate);
    }
    catch (e) {
        console.error(e);
        res.status(400);
    }
}));
// post endpoint to update user's dateData
app.post('/api/recipes', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("modify recipes");
    // console.log(req);
    try {
        yield conn_1.default.updateDateDate(req.body.user.email, req.body.dateData);
        res.status(201);
    }
    catch (e) {
        console.error(e);
        res.status(400);
    }
}));
// middleware to authenticate token from the client, use in routes that require user to be logged in
function authenticateToken(req, res, next) {
    // console.log(req.body);
    const authHeader = req.headers['authorization']; // format: Bearer {token}
    const token = authHeader && authHeader.split(' ')[1]; // check for authorization header, get token
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Authorization failed");
            return res.status(403);
        }
        req.body.user = user;
        next();
    });
}
app.listen(port, () => {
    // connect to db when server starts
    // connectToDb().catch(console.dir);
    console.log(`Server is running on port: ${port}`);
});
