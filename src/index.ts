import express, { type Express, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoutes from './routes/authRoutes';
import ProductRoutes from './routes/productRoutes';
import AddressRoutes from './routes/addressRoutes';

dotenv.config()
const app: Express = express()
const port = process.env.PORT || 5000

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// db connection
const mongodbURL =
`mongodb+srv://muyambangopeter:${process.env.mongoDbPassword}@clusterpbeetech.fejatzo.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(port, () => { console.log(`Connected to DB, and running on port ${port}`) }
    )
  }) 
  .catch(error => { console.log(error) })

app.get('/', (req: Request, res: Response) => {
  res.send('hello typescript')
})

app.use(AuthRoutes);
app.use(ProductRoutes);
app.use(AddressRoutes);
