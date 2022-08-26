import ensureAuthenticated from '@/modules/user/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ShortenerController } from '../controllers/ShortenerController';

const shortenerRouter = Router();
const shortenerController = new ShortenerController();

shortenerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            url: Joi.string().required(),
            limit: Joi.number(),
            category: Joi.string(),
        },
    }),
    shortenerController.create,
);

shortenerRouter.post(
    '/private',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            url: Joi.string().required(),
            limit: Joi.number(),
            category: Joi.string(),
        },
    }),
    shortenerController.createPrivate,
);

export { shortenerRouter };