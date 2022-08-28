import ensureAuthenticated from '@/modules/user/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi as JoiBase, Segments } from 'celebrate';
import JoiDate from '@joi/date';
import { Router } from 'express';
import { ShortenerController } from '../controllers/ShortenerController';

const shortenerRouter = Router();
const shortenerController = new ShortenerController();

const Joi = JoiBase.extend(JoiDate);

shortenerRouter.get('/', ensureAuthenticated, shortenerController.findAllByUserId);

shortenerRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            url: Joi.string().required(),
            lifeTime: Joi.date().required(),
            limit: Joi.number(),
            category: Joi.string(),
            password: Joi.string(),
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
            lifeTime: Joi.date().required(),
            limit: Joi.number(),
            category: Joi.string(),
            password: Joi.string(),
        },
    }),
    shortenerController.createPrivate,
);

shortenerRouter.get(
    '/:shortId',
    celebrate({
        [Segments.QUERY]: {
            password: Joi.string(),
        },
    }),
    shortenerController.findByShortId,
);

shortenerRouter.delete('/:shortId', ensureAuthenticated, shortenerController.delete);

export { shortenerRouter };
