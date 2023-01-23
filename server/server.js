import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import connectDB from './config/connectDb.js';
import corsOptions from './config/corsOption.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import rootRoutes from './routes/rootRoutes.js';
import notFoundMiddleware from './middleware/notFound.js';
import { loggerMiddleware } from './middleware/logger.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

dotenv.config();
const app = express();
connectDB();

const PORT = 5000;

app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

app.use('/', rootRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});
