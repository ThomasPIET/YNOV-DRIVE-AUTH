import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    db_uri: process.env.DB_URI,
    dataService: {
        baseUrl: process.env.DATA_SERVICE_BASEURL,
        port: process.env.DATA_SERVICE_PORT,
    },
    authServiceToken: process.env.AUTH_SERVICE_TOKEN,
    mailService: {
        token: process.env.SMTP_SERVICE_TOKEN,
        baseUrl: process.env.SMTP_SERVICE_BASEURL,
        port: process.env.SMTP_SERVICE_PORT,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};