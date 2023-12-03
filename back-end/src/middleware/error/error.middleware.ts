import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "./error.handler";
import {
  AllExceptions,
  CustonException,
  InternalServerErrorException,
  TypeORMException,
} from "./custonErrors.error";
import { TypeORMError } from "typeorm";

export const errorMiddleware = (
  error: AllExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const typeormExcepton = error instanceof TypeORMError
  if(typeormExcepton) {
    error = new TypeORMException(error)
  }
  
  const customException = error instanceof CustonException;
  if (!customException) {
    console.log('INTERNAL', error);
    
    error = new InternalServerErrorException(error);
  }
  
  new ErrorHandler(error).catchError(res);

  next();
};
