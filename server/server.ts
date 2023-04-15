import express, {Express, Request, Response} from "express";
import { User } from "./db/User"

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
 
app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try{
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
    res.json({status: 'ok'});
  }catch(err){
    res.json({status: 'registration error'});
  }
  res.json({status: 'ok'})
})

app.listen(port, () => {
  // connect to db when server starts
  connectToDb().catch(console.dir);

  console.log(`Server is running on port: ${port}`);
});