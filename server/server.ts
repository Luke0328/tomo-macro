import express, {Express, Request, Response} from "express";
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

import { connectToDb } from "./db/conn";

app.get("/", (req, res) => {
    res.send("HELLO");
})
 
app.listen(port, () => {
  // connect to db when server starts
  connectToDb().catch(console.dir);

  console.log(`Server is running on port: ${port}`);
});