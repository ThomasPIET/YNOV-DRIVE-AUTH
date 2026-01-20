import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    db_uri: process.env.DB_URI,
    auth: {
        serviceBaseUrl: process.env.AUTH_SERVICE_BASEURL,
        servicePort: process.env.AUTH_SERVICE_PORT,
        serviceToken: process.env.AUTH_SERVICE_TOKEN,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};