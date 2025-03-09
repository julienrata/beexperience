import express, { Express } from 'express';
import cors from 'cors';
import config from './config/config';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';

/**
 * Express application setup
 * Separating the app from the server for easier testing
 */
const app: Express = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

// Error handling
app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;