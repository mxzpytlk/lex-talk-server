import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const router: Router = new (Router as any)();

router.get('/activate/:link', UserController.activate);

export default router;
