import { Router } from 'express';
import { ImgController } from '../controllers/file.controller';
import { UserController } from '../controllers/user.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const router: Router = new (Router as any)();

router.get('/activate/:link', UserController.activate);
router.get('/file/:id', ImgController.getImg);
router.post('/send/file/:id', ImgController.sendImg);
router.post('/update/avatar', UserController.saveAvatar);

export default router;
