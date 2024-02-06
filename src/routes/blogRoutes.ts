import express from 'express';
const router = express.Router();
import {getBlogs, createBlog} from '../controllers/blogController'


router.get('/blogs', getBlogs);
router.post('/blogs', createBlog)

export default router;