import { Router } from 'express';
import { apiRouter } from './api';

const router = Router();

router.use('/', apiRouter);

export { router };