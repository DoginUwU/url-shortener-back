import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
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

export { sessionRouter };
