import express, { Express, Request, Response } from "express";
const dotenv = require('dotenv');

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request,  res: Response) => {
    res.send('hello typescript')
})

app.listen( port, () => console.log(`running on port ${port}`))