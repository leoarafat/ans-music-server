import express, { Application, Request, Response } from 'express';
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
    origin: ['http://localhost:3000', 'http://localhost:5173'],
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
app.use('/api', routes);
// app.use('/api/uploads', express.static('uploads'));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to ANS Music');
});
//Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);
