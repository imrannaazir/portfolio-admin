import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import { Application } from 'express';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();
// parser
app.use(express.json());
app.use(cookieParser());

// List of allowed origins
const allowedOrigins: string[] = [
  'https://imrannaaziremon.vercel.app',
  'https://admin-imrannaaziremon.vercel.app',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

// Configure CORS
app.use(cors(corsOptions));

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

// all route
app.use('/api/v1', router);

// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
