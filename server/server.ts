import express, {Express, Request, Response} from "express";
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
// get driver connection
const dbo = require("./db/conn");

app.get("/", (req, res) => {
    res.send("HELLO");
})
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.run().catch(console.dir);
  console.log(`Server is running on port: ${port}`);
});