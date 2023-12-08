import { Response } from "express";
import { AllExceptions, ExceptionData } from "./custonErrors.error";
import { STATUS_CODE } from "../../constants/statusCodes.constant";
import { ErrorObject } from "../../shared/utils/validator";

export class ErrorHandler {
  errorMessage: string;
  stack?: string;
  status: number;
  error?: Error;
  name: string;
  errors?: ErrorObject | null;
  exceptionData?: ExceptionData
  

  constructor(error: AllExceptions) {
    this.error = error;
    this.status = error.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
    this.errorMessage = error.message;
    this.name = error.name;
    this.stack = error.stack;
    this.errors = error.hideErrors ? null : error.errors;
    this.exceptionData = error.exceptionData

    console.log(this.name); // new Relic aqui
    console.log(this.status); // new Relic aqui
    console.log(this.errorMessage); // new Relic aqui
    console.log(this.stack); // new Relic aqui
    // console.log(this.error); // new Relic aqui
    console.log(this.exceptionData); // new Relic aqui
  }

  catchError(res: Response) {
    return res.status(this.status).send({
      status: this.status,
      errorMessage: this.errorMessage,
      errors: this.errors,
    });
  }
}
