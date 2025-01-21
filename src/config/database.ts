import { DataSource } from "typeorm";
import appDataSource from "./data-source.js";

export class Database {
    public dataSource: DataSource = appDataSource;
    private static instance: Database;

    private constructor() {
        this.initialize();
    }

    private async initialize() {
        try {
            await this.dataSource.initialize();
            console.log("DataSource initialized successfully");
        } catch (err) {
            console.error("DataSource initialization error:", err);
            throw err;
        }
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}
