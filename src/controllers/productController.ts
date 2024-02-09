import { Request, Response } from "express";
import {Error} from "mongoose";
import Product from "../models/Product";
import {IProduct} from "../types";


export const getProducts = (req: Request, res: Response) => {
    const products = Product.find({});
    products.then(product => res.json(product)).catch(err => res.send(err))
}

export const createProduct = async (req: Request, res: Response) => {
    const {name, price, description, quantity, image } = req.body;
    
    try {
        const products = await Product.create({name, price, description, quantity, image});
        res.json({products})
    } catch (error) {
        res.json({error})
    }
    
}
