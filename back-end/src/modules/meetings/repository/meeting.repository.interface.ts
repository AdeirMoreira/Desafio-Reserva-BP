import { DeleteResult, UpdateResult } from "typeorm";
import { IdUserDTO } from "../../users/dtos/idUser.dto";
import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { Meeting } from "../entity/meeting.entity";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";

export interface IMeetingRepository {
    getMeetings({ idUser }: IdUserDTO): Promise<Meeting[]>;
    exist(where: Partial<Meeting>): Promise<boolean>;
    findOneBy(where: Partial<Meeting>): Promise<Meeting | null>;
    save(createMeetingDTO: CreateMeetingDTO): Promise<Meeting>;
    update({ idMeeting }: IdMeetingDTO, updateMeetingDTO: UpdatedMeetingDTO): Promise<UpdateResult>;
    delete({ idMeeting }: IdMeetingDTO): Promise<DeleteResult>;
  }