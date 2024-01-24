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
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//All Routes
app.use('/api/v1', routes);
// app.use('/api/v1/src/uploads', express.static('uploads'));
app.use(
  '/uploads',
  (req, res, next) => {
    console.log('Received request for:', path.join('../src/uploads', req.url));
    next();
  },
  express.static('uploads'),
);

//Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);
