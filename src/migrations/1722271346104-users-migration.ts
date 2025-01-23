import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
import { UserRoles } from "../config/constants.js";

export class UsersMigration1722271346104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "name",
            type: "varchar",
            length: "255",
          }),
          new TableColumn({
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          }),
          new TableColumn({
            name: "password",
            type: "varchar",
            length: "255",
          }),
          new TableColumn({
            name: 'role',
            type: 'enum',
            enum: [...Object.values(UserRoles)],
            default: `'${UserRoles.USER}'`

          }),
          new TableColumn({
            name: 'reset_token',
            type: 'text',
            isNullable: true
          }),
          new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          }),
          new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          }),
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("users", true);
  }
}
