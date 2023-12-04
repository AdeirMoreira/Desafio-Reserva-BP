import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeetingsTable1701622767167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Meentings",
        columns: [
          {
            name: "idMeeting",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            primaryKeyConstraintName: "idMeeting_PK",
          },
          { name: "idBroker", type: "int", isNullable: false },
          { name: "idCostumer", type: "int", isNullable: false },
          { name: "startAt", type: "timestamp", isNullable: false },
          { name: "endAt", type: "datetime", isNullable: false },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Meentings", true, true, true);
  }
}
