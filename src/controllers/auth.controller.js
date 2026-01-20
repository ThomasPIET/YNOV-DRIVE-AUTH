import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { authService } from '../services/auth.service.js';
import { env } from '../config/env.js';

// Validation schemas
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const authController = {
    register: async (req, res, next) => {
        try {
            const { error, value } = registerSchema.validate(req.body);

            if (error) {
                console.log('Validation error:', error.message);
                return res.status(400).json({ message: error.message });
            }

            const { name, email, password } = value;

            const result = await authService.register({ name, email, password });

            return res.status(201).json({
                user: {
                    id: result.user.id,
                    name: name,
                    email: result.user.email,
                },
                accessToken: result.accessToken,
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }

            const { email, password } = value;

            const result = await authService.login({ email, password });

            return res.status(200).json({
                user: {
                    id: result.user.id,
                    email: result.user.email,
                },
                accessToken: result.accessToken,
            });
        } catch (err) {
            next(err);
        }
    },

    verify: (req, res) => {
        try {
            const authHeader = req.headers.authorization || '';

            if (!authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token manquant ou invalide.' });
            }

            const token = authHeader.split(' ')[1];

            const decoded = jwt.verify(token, env.jwt.secret);

            return res.json({
                valid: true,
                user: {
                    id: decoded.id,
                    email: decoded.email,
                },
            });
        } catch (error) {
            console.error('Erreur verify token :', error.message);
            return res.status(401).json({ valid: false, message: 'Token invalide ou expiré.' });
        }
    },
};