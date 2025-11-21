import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';

const router = new Router({prefix: '/apiClient'});

router.get('/notifications-with-setting', notificationController.getNotificationsWithSetting);

export default router;
