import { Request, Response } from "express";
import Blog from "../models/blog";

export const getBlogs = (req: Request, res:Response) => {
    res.send('list of all blogs');
}

