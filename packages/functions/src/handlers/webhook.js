import App from 'koa';
import router from '@functions/routes/webhook';

const app = new App();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
