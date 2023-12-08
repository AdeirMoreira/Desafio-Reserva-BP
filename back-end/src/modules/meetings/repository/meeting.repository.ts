import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../../../database/database";
import { Meeting } from "../entity/meeting.entity";
import { IdUserDTO } from "../../users/dtos/idUser.dto";
import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { IMeetingRepository } from "./meeting.repository.interface";

export class MeetingRepository implements IMeetingRepository {
  private meetingRepository = AppDataSource.getRepository(Meeting);

  async getMeetings({ idUser }: IdUserDTO): Promise<Meeting[]> {
    return this.meetingRepository.find({
      select: ["idMeeting", "idBroker", "idCustomer", "startAt", "endAt"],
      where: { idBroker: idUser },
    });
  }

  async exist(where: Partial<Meeting>):Promise<boolean> {
    return  this.meetingRepository.exist({where});
  }

  async findOneBy(where: Partial<Meeting>):Promise<Meeting | null> {
    return this.meetingRepository.findOneBy(where);
  }

  async save(createMeetingDTO: CreateMeetingDTO): Promise<Meeting> {
    return this.meetingRepository.save(createMeetingDTO);
  }

  async update(
    { idMeeting }: IdMeetingDTO,
    updateMeetingDTO: UpdatedMeetingDTO
  ): Promise<UpdateResult> {
    return this.meetingRepository.update(idMeeting, updateMeetingDTO);
  }

  async delete({ idMeeting }: IdMeetingDTO): Promise<DeleteResult> {
    return this.meetingRepository.delete(idMeeting);
  }
}
