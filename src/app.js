import express from 'express';
import cors from 'cors';

// import { errorHandler } from './middlewares/error.middleware.js';

export const App = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use(errorHandler);

    return app;
}