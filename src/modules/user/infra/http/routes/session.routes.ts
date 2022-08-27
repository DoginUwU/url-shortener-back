import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SessionController } from '../controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        },
    }),
    sessionController.create,
);

sessionRouter.post(
    '/validate',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().required(),
        },
    }),
    sessionController.validate,
);

export { sessionRouter };
