import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { env } from './shared/env';
import router from './routers';
import ApplicationError from './errors/application-error';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error | ApplicationError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = (err as ApplicationError).statusCode || 500;

    const payload = {
        status: 'error',
        message: statusCode === 500 ? 'Internal server error. Please try again later or send a report' : err.message,
    };

    if (process.env.NODE_ENV !== 'production') {
        payload['data'] = err.stack;
    }

    // TODO: Ideally, you want to log these errors

    res.status(statusCode)
        .json(payload);
});

const PORT = Number(env('PORT'));

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

