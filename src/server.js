import { App } from './app.js';
import { env } from './config/env.js';
import { initDatabase } from './config/database.js';

import './models/AuthUser.model.js';

const server = async () => {
  await initDatabase();

    const app = App();

    app.listen(env.port, () => {
        console.log(`Auth service running on port ${env.port}`);
    });
};

server();