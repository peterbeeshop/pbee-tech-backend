import dotenv from 'dotenv'
dotenv.config() //call the dotenv before importing other modules. Calling it later after importing modules and files led to an error where env variables were not accessible within nested folders unless I imported dotenv from 'dotenv' in that particular file.
import express, { type Express, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import AuthRoutes from './routes/authRoutes'
import ProductRoutes from './routes/productRoutes'
import AddressRoutes from './routes/addressRoutes'

const app: Express = express()
const port = process.env.PORT || 5000

// Parse JSON requests
app.use(express.json())

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// db connection
const mongodbURL = `mongodb+srv://muyambangopeter:${process.env.mongoDbPassword}@clusterpbeetech.fejatzo.mongodb.net/?retryWrites=true&w=majority`
mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB, and running on port ${port}`)
    })
  })
  .catch(error => {
    console.log(error)
  })

app.get('/', (req: Request, res: Response) => {
  res.send('hello typescript')
})

app.use(AuthRoutes)
app.use(ProductRoutes)
app.use(AddressRoutes)
