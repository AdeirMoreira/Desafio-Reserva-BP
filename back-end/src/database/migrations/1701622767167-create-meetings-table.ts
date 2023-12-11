import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeetingsTable1701622767167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Meetings",
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
          { name: "idCustomer", type: "int", isNullable: false },
          { name: "startAt", type: "varchar", isNullable: false },
          { name: "endAt", type: "varchar", isNullable: false },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
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
    await queryRunner.dropTable("Meetings", true, true, true);
  }
}
