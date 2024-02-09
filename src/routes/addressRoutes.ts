import { getAddress, createAddress } from "../controllers/addressController";
import {Router} from 'express';

const router = Router();

//get all the address in the db
router.get('/address', getAddress);

router.post('/address', createAddress);


export default router;


