import { AuthUserModel } from '../models/AuthUser.model.js';

export const authUserRepository = {
    findAll: async (options = {}) => {
        return AuthUserModel.findAll(options);
    },

    findById: async (id, options = {}) => {
        return AuthUserModel.findByPk(id, options);
    },

    findByEmail: async (email, options = {}) => {
        return AuthUserModel.findOne({ where: { email }, ...options });
    },

    create: async ({ email, password_hash }, options = {}) => {
        return AuthUserModel.create({ email, password_hash }, options);
    },

    update: async (id, data, options = {}) => {
        return AuthUserModel.update(data, { where: { id }, ...options });
    },

    delete: async (id, options = {}) => {
        return AuthUserModel.destroy({ where: { id }, ...options });
    },

    updateLastLogin: async (id, options = {}) => {
        return AuthUserModel.update(
            { last_login: new Date() },
            { where: { id }, ...options }
        );
    },
};