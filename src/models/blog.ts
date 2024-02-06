import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: String,
    description: String
})

const Blog = mongoose.model('blog', BlogSchema);

export default Blog;