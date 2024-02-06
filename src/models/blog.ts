import {Schema, model} from "mongoose";

export interface IBlog {
    title: string;
    description: string;
}

const BlogSchema = new Schema<IBlog>({
    title: String,
    description: String
})

const Blog = model<IBlog>('blog', BlogSchema);

export default Blog;