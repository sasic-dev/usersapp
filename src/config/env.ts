import dotenv from 'dotenv';
import { EnvConfigType } from '../interfaces/config.js';

dotenv.config();

export const EnvConfig: EnvConfigType = {
    "APP_NAME": process.env.APP_NAME ?? "Rest api",
    "MAINTENANCE_MODE": process.env.MAINTENANCE_MODE ? Boolean(process.env.MAINTENANCE_MODE) : false,
    "PORT": process.env.PORT ? Number(process.env.PORT) : 5050,
    "DB_HOST": process.env.DB_HOST ?? "localhost",
    "DB_USERNAME": process.env.DB_USERNAME ?? "root",
    "DB_PASSWORD": process.env.DB_PASSWORD ?? "",
    "DB_NAME": process.env.DB_NAME ?? "taskapp",
}