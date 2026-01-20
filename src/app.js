import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js';

import { errorHandler } from './middleware/error.middleware.js';

export const App = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoute);

    app.use(errorHandler);

    return app;
}