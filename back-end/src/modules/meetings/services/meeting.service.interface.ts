import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { Meeting } from "../entity/meeting.entity";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";
import { IdUserDTO } from "../../users/dtos/idUser.dto";

export interface IMeetingService {
  getMeetingsByUser(idUserDTO: IdUserDTO): Promise<Meeting[]>;
  getMeeting(idMeetingDTO: IdMeetingDTO): Promise<Meeting[]>;
  createMeeting(createMeetingDTO: CreateMeetingDTO): Promise<CreateMeetingDTO[]>;
  updateMeeting(
    idMeetingDTO: IdMeetingDTO,
    updateMeetingDTO: UpdatedMeetingDTO
  ): Promise<Meeting[]>;
  deleteMeeting(idMeetingDTO: IdMeetingDTO): Promise<Meeting[]>;
}
