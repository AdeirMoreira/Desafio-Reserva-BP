import * as dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { CustonException } from "../middleware/error/custonErrors.error";
import { STATUS_CODE } from "../constants/statusCodes.constant";
import { ERROR_MESSAGES } from "../constants/errorMessages.constant";
import { CreateTableUsers1701530727848 } from "./migrations/1701530727848-create-table-users";
import { User } from "../modules/users/entity/user.entity";
import { Meeting } from "../modules/meetings/entity/meeting.entity";
import { CreateMeetingsTable1701622767167 } from "./migrations/1701622767167-create-meetings-table";
import { CreateMeetingsForeingnkeys1701624350486 } from "./migrations/1701624350486-create-meetings-foreingnkeys";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Meeting],
  migrations: [
    CreateTableUsers1701530727848,
    CreateMeetingsTable1701622767167,
    CreateMeetingsForeingnkeys1701624350486,
  ],
  migrationsRun: false,
});

export function openConnection() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database has been initialized!");
    })
    .catch((err) => {
      // New Relic aqui
      const error = new CustonException(
        ERROR_MESSAGES.DATABASE_START_FAILURE,
        STATUS_CODE.INTERNAL_SERVER_ERROR,
        err
      );

      console.error(error);
    });
}
