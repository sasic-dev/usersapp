import express, { Request, Response, NextFunction } from 'express';
import { EnvConfig } from './config/env.js';
import errorHandler, { validationErrorHandler } from './middlewares/error_handler.js';
import apiRouter from './routes/api.js';
import { Database } from './config/database.js';
import Redis from 'ioredis';

// Initialize express
const app = express();
const port: number = EnvConfig.PORT;

// const redisClient = new Redis({
//     host: '127.0.0.1',
//     port: 6379
// });

// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// })

// redisClient.on('error', () => {
//     console.log('Error connecting to Redis');
// })

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));

// Routes
app.use('/', apiRouter);

app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ "message": "Not Found" });
});

//Initialize database
(async () => {
    try {
        Database.getInstance();
    } catch(err) {
        console.error('Error during DataSource initialization:', err);
    }
})();

// Error handler
app.use(validationErrorHandler);
app.use(errorHandler);

//Listening request
app.listen(port, () => {
    console.log(`server started on port${port}`);
});