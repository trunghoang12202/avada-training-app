import Router from 'koa-router';
import * as webhookController from '@functions/controllers/webhookController';

const router = new Router({prefix: '/webhook'});

router.post('/orders/new', webhookController.listenNewOrder);

export default router;
