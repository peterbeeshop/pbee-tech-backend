import { Request, Response } from "express";
import Blog, {IBlog} from "../models/blog";

export const getBlogs = (req: Request, res:Response) => {
    res.send('all is well');
}

export const createBlog = (req: Request, res:Response) => {
    const {title, description } = req.body;
    console.log(title, description)
    const myblog = new Blog({title, description})
    myblog.save().then(blog => {
        res.send(blog)
    }).catch(err => res.send(err))
    
}