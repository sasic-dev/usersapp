import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class UserRefreshTokens1737119388485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_refresh_tokens",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isGenerated: true,
            unsigned: true,
            generationStrategy: "increment",
            isPrimary: true,
          }),
          new TableColumn({
            name: "user_id",
            type: "int",
            isNullable: false,
          }),
          new TableColumn({
            name: "token",
            type: "varchar",
            length: "255",
            isNullable: false,
          }),
          new TableColumn({
            name: "expires_at",
            type: "datetime",
            isNullable: false,
          }),
          new TableColumn({
            name: "is_revoked",
            type: "boolean",
            default: false,
          }),
          new TableColumn({
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          }),
          new TableColumn({
            name: "updated_at",
            type: "datetime",
            default: null,
            onUpdate: "CURRENT_TIMESTAMP",
          }),
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "user_refresh_tokens",
      new TableForeignKey({
        name: "user_refresh_tokens_user_id_fkey",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "user_refresh_tokens",
      "user_refresh_tokens_user_id_fkey"
    );
    await queryRunner.dropTable("user_refresh_tokens", true);
  }
}
