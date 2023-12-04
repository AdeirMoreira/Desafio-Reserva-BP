import { DeleteResult, UpdateResult } from "typeorm";
import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { Meeting } from "../entity/meeting.entity";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";

export interface IMeetingService {
  getMeetings(): Promise<Meeting[]>;
  findBy(idMeeting: number): Promise<Meeting | null>;
  createMeeting(createMeetingDTO: CreateMeetingDTO): Promise<CreateMeetingDTO>;
  updateMeeting(
    idMeetingDTO: IdMeetingDTO,
    updateMeetingDTO: UpdatedMeetingDTO
  ): Promise<UpdateResult>;
  deleteMeeting(idMeetingDTO: IdMeetingDTO): Promise<DeleteResult>;
}
