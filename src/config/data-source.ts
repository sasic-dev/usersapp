import { DataSource } from "typeorm";
import { EnvConfig } from "./env.js";

// Determine whether the app is running in production or development
const isProduction = EnvConfig.APP_ENV === "production";
console.log(EnvConfig.APP_ENV , 'environment')
const appDatasource = new DataSource({
    type: "mysql",
    host: EnvConfig.DB_HOST,
    port: 3306,
    username: EnvConfig.DB_USERNAME,
    password: EnvConfig.DB_PASSWORD,
    database: EnvConfig.DB_NAME,
    entities: [isProduction ? "build/entities/**/*.js" : "src/entities/**/*.ts"],
    migrations: [isProduction ? "build/migrations/**/*.js" : "src/migrations/**/*.ts"],
    logging: true,
    synchronize: false,
});

export default appDatasource;