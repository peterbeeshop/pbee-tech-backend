import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: String,
    price: String,
    description: String,
    quantity: String,
    image: String,
})

const Product = model('product', ProductSchema);

export default Product;