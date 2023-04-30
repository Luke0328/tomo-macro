import express, {Express, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { User } from "./db/User"

const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

import DbFacade from "./db/conn";

DbFacade.connectToDb().catch(console.dir);

app.get("/", (req, res) => {
    res.send("HELLO");
})
 
app.post('/api/register', async (req, res) => {
	// console.log(req.body);
  if(await DbFacade.checkForUser(req.body.email)) {
    res.json({status:'error', message: 'User already exists'});
    return;
  } else {
		try {
			await bcrypt.hash(req.body.password, 10, (err: Error, hash: string) => {
				if (err) {
					res.status(424).json({status: 'error', message: 'Error hashing password'});
					//throw(err);
				} else {
					DbFacade.createUser(req.body.firstName, req.body.lastName, req.body.email, hash);
					res.status(201).json({status: 'ok'});
				}
			});
		} catch (err) {
			res.status(424).json({status: 'error', message: 'Error registering user'});
		}
    }
})

// endpoint for testing authenticating token
// app.get('/test_login', authenticateToken, (req, res) => {
// 	console.log(req.body);
// 	res.json("SUCCESS");
// })

app.post('/api/login', async (req, res) => {
  try {
    const user = await DbFacade.findUser(req.body.email);
	const passwordsMatch = await bcrypt.compare(req.body.password, user?.password);

    if (!passwordsMatch) {
      return res.status(401).json({status: 'error', message: `Invalid email or password`});
    } else {
      console.log('Logged in successfully');
      // res.status(200).json({status: 'ok', message: `Login successful`});
    }
  } catch(err) {
    return res.status(401).json({status: 'error', message: `Invalid email or password`});
  }

  // serialize body as jwt
  const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '12h' });
  res.status(201).json( {status: 'ok', accessToken: accessToken} )
})

// get endpoint for user's recipes
app.get('/api/recipes', authenticateToken, async (req, res) => {
	// console.log("get");
	try {
		const user: any = await DbFacade.findUser(req.body.user.email);
		// console.log(user);
		res.status(200).json(user.recipes);
	} catch (e: any) {
		console.error(e);
		res.status(400);
	}
});

// post endpoint for updating user's recipes
app.post('/api/recipes', authenticateToken, async (req, res) => {
	console.log("modify recipes");
	// console.log(req);
	try {
		await DbFacade.updateRecipes(req.body.user.email, req.body.recipes);
		res.status(201);
	} catch (e: any) {
		console.error(e);
		res.status(400);
	}
})

// middleware to authenticate token from the client, use in routes that require user to be logged in
function authenticateToken(req: any, res: any, next: any) {
	// console.log(req.body);
  const authHeader = req.headers['authorization']; // format: Bearer {token}
  const token = authHeader && authHeader.split(' ')[1]; // check for authorization header, get token
  if(token == null) {
	return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
	if (err) {
		console.log("Authorization failed");
		return res.status(403);
	}
	req.body.user = user;
	next();
  })
}

app.listen(port, () => {
  // connect to db when server starts
  // connectToDb().catch(console.dir);
  console.log(`Server is running on port: ${port}`);
});