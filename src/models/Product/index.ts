import { Schema, model } from "mongoose";
import { IProduct } from "../../types";

const ProductSchema = new Schema<IProduct>({
    name: String,
    price: String,
    description: String,
    quantity: String,
    image: {type: String, default: ''},
})

const Product = model<IProduct>('product', ProductSchema);

export default Product;