import { DataSource } from "typeorm";
import { CustonException } from "../middleware/error/custonErrors.error";
import { STATUS_CODE } from "../constants/statusCodes.constant";
import { ERROR_MESSAGES } from "../constants/errorMessages.constant";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "admin",
  password: "full-stack",
  database: "BP",
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
