import { NextFunction, Request, Response } from "express"

export interface IUsersController {
    getUsers(req:Request, res: Response, next: NextFunction): void
    getBroker(req:Request, res: Response, next: NextFunction): void
    getCustomer(req:Request, res: Response, next: NextFunction): void
    createUser(req:Request, res: Response, next: NextFunction):void
    updateUser(req:Request, res: Response, next: NextFunction):void
    deleteUser(req:Request, res: Response, next: NextFunction):void
}