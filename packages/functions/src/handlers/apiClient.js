import App from 'koa';
import router from '@functions/routes/apiClient';
import cors from '@koa/cors';

const app = new App();

app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
