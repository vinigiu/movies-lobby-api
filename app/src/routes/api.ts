import { Router } from 'express';
import { moviesRouter } from '../modules/movies/routes';
import { usersRouter } from '../modules/users/routes';

const apiRouter = Router();

apiRouter.use('/', moviesRouter);
apiRouter.use('/user', usersRouter);

export { apiRouter };