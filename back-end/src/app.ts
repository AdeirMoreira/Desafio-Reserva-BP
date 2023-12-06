import * as dotenv from "dotenv";
dotenv.config();

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { openConnection } from "./database/database";

export const app: Express = express();

app.use(express.json());
app.use(cors());

openConnection()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Desafio Reserva BP',
      version: '1.0.0',
      description: 'Uma api para agendamento de reuniões entre corretores de seguro e clientes.',
    },
  },
  apis: ['./src/modules/**/*.route.ts'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server = app.listen(process.env.API_PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});