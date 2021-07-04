import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { UserController } from '../controllers/user.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const router: Router = new (Router as any)();

router.get('/activate/:link', UserController.activate);
router.get('/file/:id', FileController.getFile);

export default router;
