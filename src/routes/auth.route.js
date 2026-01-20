import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { checkServiceToken } from '../middleware/serviceAuth.middleware.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', checkServiceToken, authController.verify);

export default router;