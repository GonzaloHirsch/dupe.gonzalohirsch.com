import { Router } from 'express';
import { runCommand } from '../controllers/controllers';

const router = Router();

router.post('/', runCommand);

export default router;
