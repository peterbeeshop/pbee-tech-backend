import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

//db connection
let mongodbURL = `mongodb+srv://muyambangopeter:${process.env.mongoDbPassword}@clusterpbeetech.fejatzo.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongodbURL).then(() => {
    app.listen( port, () => console.log(`Connected to DB, and running on port ${port}`))
}).catch((error) => console.log(error))

app.get('/', (req: Request,  res: Response) => {
    res.send('hello typescript')
})

