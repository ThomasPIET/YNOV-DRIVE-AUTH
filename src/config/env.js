import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    authServiceUrl : process.env.AUTH_SERVICE_URL,
    authServiceToken: process.env.AUTH_SERVICE_TOKEN,
    db_uri: process.env.DB_URI,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};