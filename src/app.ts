import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
export const app: Application = express();
//cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

//parser
app.use(express.json({ limit: '900mb' }));
app.use(express.urlencoded({ extended: true, limit: '900mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//All Routes
app.use('/api/v1', routes);
// app.use('/api/v1/src/uploads', express.static('uploads'));
app.use(
  '/api/v1/src/uploads',
  express.static(path.join(__dirname, './', 'uploads')),
);

// app.use(
//   '/api/v1',
//   (req, res, next) => {
//     console.log('Received request for:', path.join('./uploads', req.url));
//     next();
//   },
//   express.static('uploads'),
// );

//Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);
