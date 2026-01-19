import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class AuthUser extends Model {};

AuthUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            isUUID: 4,
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        unique: {
            name: 'unique_user_email',
            msg: 'Email already in use',
        },
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'AuthUser',
    tableName: 'auth_users',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email'],
        },
    ],
});