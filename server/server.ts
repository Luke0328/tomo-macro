import express, {Express, Request, Response} from "express";
import { User } from "./db/User"

const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

import { connectToDb } from "./db/conn";

connectToDb().catch(console.dir);

app.get("/", (req, res) => {
    res.send("HELLO");
})
 
app.post('/api/register', async (req, res) => {
  if(await User.exists({email: req.body.email})){
    res.json({status:'error', message: 'User already exists'});
    return;
  }
  else{
    try{
      await bcrypt.hash(req.body.password, 10, (err: Error, hash: string) => {
          if(err){
            res.json({status: 'error', message: 'Error hashing password'});
            //throw(err);
          }else{
          User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          })
          res.json({status: 'ok'});
        }
      });
    }catch(err){
      res.json({status: 'error', message: 'Error registering user'});
    }
  }
})

app.post('/api/login', async (req, res) => {
  try{
    // console.log(User.findOne(req.body.email));
    const user = await User.findOne({ email: req.body.email });
    // console.log('hello')
    // console.log(user)
    const passwordsMatch = await bcrypt.compare(req.body.password,user?.password);

    if(!passwordsMatch){
      res.json({status: 'error', message: `Invalid email or password`});
    }else{
      console.log('Logged in successfully');
      res.json({status: 'ok', message: `Login successful`});
    }
  }catch(err){
    res.json({status: 'error', message: `Invalid email or password`});
  }
})

app.listen(port, () => {
  // connect to db when server starts
  // connectToDb().catch(console.dir);

  console.log(`Server is running on port: ${port}`);
});