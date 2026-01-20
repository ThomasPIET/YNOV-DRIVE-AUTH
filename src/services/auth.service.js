import { env } from '../config/env.js';
import { authUserRepository } from '../repositories/authUser.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken } from '../utils/jwt.js';
import { sequelize } from '../config/database.js';
import axios from 'axios';

export const authService = {
    register: async ({ name, email, password }) => {
        const transaction = await sequelize.transaction();
        try {
            const existingByEmail = await authUserRepository.findByEmail(email, { transaction: transaction });
            if (existingByEmail) {
                const error = new Error('Email déjà utilisé');
                error.status = 409;
                throw error;
            }

            const passwordHash = await hashPassword(password);

            const user = await authUserRepository.create({
                email,
                password_hash: passwordHash,
            },
                { transaction: transaction }
            );

            const payload = {
                userId: user.id,
                email: user.email,
            };

            const response = await axios.post(`${env.auth.serviceBaseUrl}:${env.auth.servicePort}/api/user`, {
                // headers: {
                //     Authorization: req.headers.authorization || '',
                // },
                id: user.id,
                email: user.email,
                name: name,
            });
            console.log('Response from user service:', response.data);
            if (response.status >= 400) {
                const error = new Error('Erreur lors de la création du profil utilisateur');
                error.status = response.status;
                throw error;
            }

            const accessToken = generateAccessToken(payload);

            await transaction.commit();
            return { user, accessToken };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    login: async ({ email, password }) => {
        let user = await authUserRepository.findByEmail(email);

        if (!user) {
            const error = new Error('Identifiants invalides');
            error.status = 401;
            throw error;
        }

        const isValid = await comparePassword(password, user.password_hash);
        if (!isValid) {
            const error = new Error('Identifiants invalides');
            error.status = 401;
            throw error;
        }

        await authUserRepository.updateLastLogin(user.id);

        const payload = {
            userId: user.id,
            email: user.email,
        };

        const accessToken = generateAccessToken(payload);

        return { user, accessToken };
    },
};