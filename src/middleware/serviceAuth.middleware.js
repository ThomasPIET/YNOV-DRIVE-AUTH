import { env } from '../config/env.js';

export const checkServiceToken = (req, res, next) => {
    const serviceToken = req.headers['x-service-token'];
    console.log('Service Token:', serviceToken);

    if (!serviceToken || serviceToken !== env.authServiceToken) {
        return res.status(403).json({
            message: 'Accès interdit : token de service invalide.',
        });
    }

    next();
};