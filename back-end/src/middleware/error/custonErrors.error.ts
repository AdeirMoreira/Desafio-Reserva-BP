import { ERROR_MESSAGES } from "../../constants/errorMessages.constant";
import { STATUS_CODE } from "../../constants/statusCodes.constant";
import { ErrorObject } from "../../modules/utils/validator";
import { typeORMHandler } from "./typeORMHandler.handler";

export interface AllExceptions {
  message: string;
  status: number;
  name: string;
  error?: Error;
  stack?: string;
  errors?: ErrorObject;
  hideErrors?: boolean;
  exceptionData?: ExceptionData;
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sql?: string;
}

export interface TypeORMExceptionInfo {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sql?: string;
}

export interface ExceptionData extends TypeORMExceptionInfo {}

export class CustonException implements AllExceptions {
  message: string;
  name: string;
  status: number;
  error?: Error;

  constructor(message: string, status: number, error?: Error) {
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.error = error;
  }
}

export class InternalServerErrorException extends CustonException {
  constructor(error?: Error) {
    super(
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

export class NotFoundException extends CustonException {
  constructor(error?: Error) {
    super(ERROR_MESSAGES.DATA_NOT_FOUND, STATUS_CODE.NOT_FOUND, error);
    this.name = this.constructor.name;
  }
}

export class NotAcceptableException extends CustonException {
  constructor(error?: Error) {
    super(
      ERROR_MESSAGES.DATA_VALIDATION_FAILURE,
      STATUS_CODE.NOT_ACCEPTABLE,
      error
    );
    this.name = this.constructor.name;
  }
}

export class UnauthorizedException extends CustonException {
  constructor(error?: Error) {
    super(ERROR_MESSAGES.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED, error);
    this.name = this.constructor.name;
  }
}

export class ValidationException extends CustonException {
  errors: ErrorObject;
  // hideErros Hide validation errors in the request response body
  hideErrors: boolean;

  constructor(errors: ErrorObject, hideErrors?: boolean) {
    super(ERROR_MESSAGES.DATA_VALIDATION_FAILURE, STATUS_CODE.NOT_ACCEPTABLE);
    this.name = this.constructor.name;
    this.errors = errors;
    this.hideErrors = hideErrors ?? false;
  }
}

export class TypeORMException extends CustonException {
  exceptionData: TypeORMExceptionInfo;

  constructor(error: AllExceptions) {
    super(
      typeORMHandler(error.errno, error.sqlMessage),
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      error
    );

    const typeORMErrorObject: TypeORMExceptionInfo = {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sql: error.sql,
    };

    this.name = this.constructor.name;
    this.exceptionData = typeORMErrorObject;
  }
}
