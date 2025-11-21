import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';

const router = new Router();

router.get('/', notificationController.getNotificationsByShop);
router.get('/sync', notificationController.syncNotificationsManual);

export default router;
