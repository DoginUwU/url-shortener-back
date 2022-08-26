import { Router } from 'express';

import { userRouter } from '@/modules/user/infra/http/routes/user.routes';
import { sessionRouter } from '@/modules/user/infra/http/routes/session.routes';
import { profileRouter } from '@/modules/user/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/profile', profileRouter);

export { routes };
