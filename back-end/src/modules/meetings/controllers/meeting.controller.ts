import { Request, Response, NextFunction } from "express";
import { IMeentingController } from "./meeting.controller.interface";
import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { STATUS_CODE } from "../../../constants/statusCodes.constant";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";
import { IMeetingService } from "../services/meeting.service.interface";
import { IdUserDTO } from "../../users/dtos/idUser.dto";

export class MeetingController implements IMeentingController {
  constructor(private readonly meetingService: IMeetingService) {}

  createMeeting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body;
      const createMeetingDTO = await CreateMeetingDTO.validate(body);

      const result = await this.meetingService.createMeeting(createMeetingDTO);

      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };
  getMeetings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;

      const idUserDTO = await IdUserDTO.validate(params);

      const result = await this.meetingService.getMeetings(idUserDTO)
      
      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };
  updateMeeting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;
      const body = req.body;

      const idMeetingDTO = await IdMeetingDTO.validate(params);
      const updateMeetingDTO = await UpdatedMeetingDTO.validate(body);

      const result = await this.meetingService.updateMeeting(
        idMeetingDTO,
        updateMeetingDTO
      );

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
  deleteMeeting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;

      const idMeetingDTO = await IdMeetingDTO.validate(params);

      const result = await this.meetingService.deleteMeeting(idMeetingDTO);

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
