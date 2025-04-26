import { Router } from 'express';
import { detectProduct } from '../controllers/apiControllers';

const router = Router();

router.post('/detect', detectProduct);

export default router;
