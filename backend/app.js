import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import errorHandler from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use('/api/users', userRoutes);

// Error Middleware
app.use(errorHandler);

export default app;