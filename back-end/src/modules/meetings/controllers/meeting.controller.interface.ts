import { NextFunction, Request, Response } from "express";

export interface IMeentingController {
    createMeeting(req:Request, res: Response, next: NextFunction):Promise<void>
    getMeetingsByUser(req:Request, res: Response, next: NextFunction):Promise<void>
    getMeeting(req:Request, res: Response, next: NextFunction):Promise<void>
    updateMeeting(req:Request, res: Response, next: NextFunction):Promise<void>
    deleteMeeting(req:Request, res: Response, next: NextFunction):Promise<void>
}