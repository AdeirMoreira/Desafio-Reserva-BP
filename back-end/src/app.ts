import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AddressInfo } from "net";

dotenv.config();

export const app: Express = express();

app.use(express.json());
app.use(cors());


const server = app.listen(process.env.API_PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});