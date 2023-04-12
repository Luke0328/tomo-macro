"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express_1.default.json());
// get driver connection
const dbo = require("./db/conn");
app.get("/", (req, res) => {
    res.send("HELLO");
});
app.listen(port, () => {
    // perform a database connection when server starts
    dbo.run().catch(console.dir);
    console.log(`Server is running on port: ${port}`);
});
