import axios from "axios";
import { env } from "../config/env.js";

export const queueMail = async ({ emails, subject, body_template, data, scheduled_at }) => {
    try {
        const response = await axios.post(`${env.mailService.baseUrl}:${env.mailService.port}/api/email/queue`, {
            emails,
            subject,
            body_template,
            data,
            scheduled_at,
        }, {
            headers: {
                "x-service-token": env.mailService.token,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};