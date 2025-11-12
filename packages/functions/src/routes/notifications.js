import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';

const router = new Router();
router.get('/', notificationController.getNotificationsByShop);

export default router;
