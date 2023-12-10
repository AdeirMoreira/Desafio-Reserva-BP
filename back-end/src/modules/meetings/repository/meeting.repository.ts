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

  async getMeetingsByUser({ idUser }: IdUserDTO): Promise<Meeting[]> {
    return this.meetingRepository.createQueryBuilder('meeting')
      .select([
        'meeting.idMeeting as idMeeting',
        'meeting.idBroker as idBroker',
        'meeting.idCustomer as idCustomer',
        'meeting.startAt as startAt',
        'meeting.endAt as endAt',
        '(SELECT name FROM Users WHERE Users.idUser = meeting.idBroker) AS broker',
        '(SELECT name FROM Users WHERE Users.idUser = meeting.idCustomer) AS customer',
      ])
      .where('meeting.idBroker = :userId OR meeting.idCustomer = :userId', { userId: idUser })
      .getRawMany();

      // Olá ai Sam, venci a aposta, e meu picolé? 

    // return this.meetingRepository.query(`
    // SELECT idMeeting,
    //     idBroker,
    //     idCustomer,
    //     startAt,
    //     endAt,
    //     (
    //           SELECT NAME
    //           FROM   Users
    //           WHERE  Users.idUser = M.idBroker) AS broker,
    //     (
    //           SELECT NAME
    //           FROM   Users
    //           WHERE  Users.idUser = M.idCustomer) AS customer
    // FROM   Meetings M
    // WHERE  M.idBroker = ${idUser}
    //   OR     M.idCustomer = ${idUser};
    // `)
  }

  async getMeeting({ idMeeting }: IdMeetingDTO): Promise<Meeting[]> {
    return this.meetingRepository.find({
      select: ["idMeeting", "idBroker", "idCustomer", "startAt", "endAt"],
      where: { idMeeting },
    });
  }

  async exist(where: Partial<Meeting>): Promise<boolean> {
    return this.meetingRepository.exist({ where });
  }

  async findOneBy(where: Partial<Meeting>): Promise<Meeting | null> {
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
