import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateMeetingsForeingnkeys1701624350486
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys("Meetings", [
      new TableForeignKey({
        name: "Meetings_User_IdBroker_FK",
        referencedTableName: "Users",
        referencedColumnNames: ["idUser"],
        columnNames: ["idBroker"],
      }),
      new TableForeignKey({
        name: "Meetings_User_IdCustomer_FK",
        referencedTableName: "Users",
        referencedColumnNames: ["idUser"],
        columnNames: ["idCustomer"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Meetings", "Meetings_User_IdBroker_FK");
    await queryRunner.dropForeignKey(
      "Meetings",
      "Meetings_User_IdCustomer_FK"
    );
  }
}
