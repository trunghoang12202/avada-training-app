import Router from 'koa-router';
import * as settingController from '@functions/controllers/settingController';
import settingInputMiddleware from '@functions/middleware/settingInputMiddleware';

const router = new Router();
router.get('/', settingController.getSetting);
router.put('/', settingInputMiddleware, settingController.updateSetting);

export default router;
