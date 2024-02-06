import express from 'express';
import { getBlogs } from '../controllers/blogController';
const router = express.Router();


router.get('/blogs', getBlogs);

export default router;