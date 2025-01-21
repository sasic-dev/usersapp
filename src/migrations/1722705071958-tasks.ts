import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";
import { TaskStatus } from "../utils/common.js";

export class Tasks1722705071958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                new TableColumn({
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                }),
                new TableColumn({
                    name: "user_id",
                    type: "int",
                    isNullable: false
                }),
                new TableColumn({
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                }),
                new TableColumn({
                    name: "completed",
                    type: "enum",
                    enumName: "task_completed_enum",
                    enum: Object.values(TaskStatus).map(status => status.toString()),
                    default: `'${TaskStatus.PENDING}'`
                }),
                new TableColumn({
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                }),
                new TableColumn({
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                })
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                    name: "fk_task_user_id"
                })
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true, true)
    }

}
