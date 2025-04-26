import { Router } from 'express';
import { detectProduct, findProductDupes } from '../controllers/apiControllers';

const router = Router();

router.post('/detect', detectProduct);
router.post('/find', findProductDupes); // TODO: Maybe make this a GET request.

export default router;
