import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGO_URI || '';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error conecting to MongoDB:'));
db.once('open', () => {
  console.log('Conected to MongoDB');
});

export default db;

