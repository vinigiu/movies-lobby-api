import { createServer } from 'http';
import dotenv from 'dotenv';
import db from '../libs/mongoose/database';

import app from './app';

dotenv.config();

const server = createServer(app);

app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3333);

server.listen(app.get('port'), app.get('host'), async () => {
    console.log(
        `Movies server started!: ${app.get('host')}:${app.get('port')}`
    );
});

const shutDown = () => {
    server.close(async () => {
      await db.close();
      process.exit(0);
    });
};

process.on('beforeExit', shutDown);
process.on('exit', shutDown);

export default app;