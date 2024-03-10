import AppError from '../libs/errors/AppError';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import log from '../libs/providers/LogProvider';
import { router } from '../routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger_output.json';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
  
    console.log(err);
    log('error', err.message, err.stack);
  
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  });

export default app;