import { errors as ErrorsCelebrate } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import '../containers';
import errorHandler from './middlewares/errorHandler';
import { routes } from './routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(ErrorsCelebrate());
app.use(errorHandler);

app.listen(8000, () => {
    console.log('Server started on port 8000');
});
