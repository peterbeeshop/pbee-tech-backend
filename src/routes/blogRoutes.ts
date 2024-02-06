import express from 'express';
const router = express.Router();
import {getBlogs} from '../controllers/blogController'


router.get('/blogs', getBlogs);

export default router;