import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateMeetingsForeingnkeys1701624350486
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("Meentings", [
      new TableForeignKey({
        name: "Meetings_User_IdBroker_FK",
        referencedTableName: "Users",
        referencedColumnNames: ["idUser"],
        columnNames: ["idBroker"],
      }),
      new TableForeignKey({
        name: "Meetings_User_IdCostumer_FK",
        referencedTableName: "Users",
        referencedColumnNames: ["idUser"],
        columnNames: ["idCostumer"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Meentings", "Meetings_User_IdBroker_FK");
    await queryRunner.dropForeignKey(
      "Meentings",
      "Meetings_User_IdCostumer_FK"
    );
  }
}
