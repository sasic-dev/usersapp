import { DataSource } from "typeorm";
import { EnvConfig } from "./env.js";

const appDatasource = new DataSource({
    type: "mysql",
    host: EnvConfig.DB_HOST,
    port: 3306,
    username: EnvConfig.DB_USERNAME,
    password: EnvConfig.DB_PASSWORD,
    database: EnvConfig.DB_NAME,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    logging: "all",
    synchronize: false,
});

export default appDatasource;