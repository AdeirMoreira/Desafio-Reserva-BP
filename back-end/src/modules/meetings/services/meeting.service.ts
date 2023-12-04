import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { CreateMeetingDTO } from "../dtos/createMeenting.dto";
import { IdMeetingDTO } from "../dtos/idMeeting.dto";
import { UpdatedMeetingDTO } from "../dtos/updateMeeting.dto";
import { Meeting } from "../entity/meeting.entity";
import { IMeetingService } from "./meeting.service.interface";
import { IUserService } from "../../users/services/user.service.interface";
import {
  NotAcceptableException,
  NotFoundException,
} from "../../../middleware/error/custonErrors.error";
import { User } from "../../users/entity/user.entity";
import { USER_ROLE } from "../../../constants/index.constant";

export class MeetingService implements IMeetingService {
  constructor(
    private readonly meetingRepository: Repository<Meeting>,
    private readonly userService: IUserService
  ) {}

  async getMeetings(): Promise<Meeting[]> {
    throw new Error("Method not implemented.");
  }

  findBy(idMeeting: number): Promise<Meeting | null> {
    throw new Error("Method not implemented.");
  }

  async createMeeting({
    idBroker,
    idCostumer,
    startAt,
    endAt,
  }: CreateMeetingDTO): Promise<CreateMeetingDTO> {
    this.isValidMeetingDate(startAt, endAt);

    const promises = [
      this.userService.findBy({ idUser: idBroker, role: USER_ROLE.BROKER }),
      this.userService.findBy({ idUser: idCostumer, role: USER_ROLE.COSTUMER }),
    ];

    let [searchedBroker, searchedCostumer] = await Promise.allSettled(promises);
    const broker = this.handleFulfilled(searchedBroker, USER_ROLE.BROKER);
    const costumer = this.handleFulfilled(searchedCostumer, USER_ROLE.COSTUMER);

    broker?.meetings.forEach((m) => {
      const meetingSameTime = this.checkMeetingsSameTime(
        startAt,
        endAt,
        m.startAt.toString(),
        m.endAt.toString()
      );

      if (meetingSameTime) {
        throw new NotAcceptableException(
          `It was not possible to schedule the meeting from ${startAt} to ${endAt}` + 
          `because the broker ${broker.name} already has a meeting scheduled from ${m.startAt} to ${m.endAt}.`
        );
      }
    });


    return this.meetingRepository.save({
      idBroker,
      idCostumer,
      startAt,
      endAt,
    });
  }

  async updateMeeting(
    { idMeeting }: IdMeetingDTO,
    updateMeetingDTO: UpdatedMeetingDTO
  ): Promise<UpdateResult> {
    throw new Error("Method not implemented.");
  }

  async deleteMeeting({ idMeeting }: IdMeetingDTO): Promise<DeleteResult> {
    throw new Error("Method not implemented.");
  }

  private handleFulfilled = (
    result: PromiseSettledResult<User | null>,
    entityName: string
  ) => {
    if (result.status === "fulfilled" && !result.value) {
      throw new NotFoundException(`${entityName} not found.`);
    }

    return result.status === "fulfilled" && result.value ? result.value : null;
  };

  private isValidMeetingDate(start: string, end: string): void {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    const thirtyMinutes = 30 * 60 * 1000;
    const twoHours = 2 * 60 * 60 * 1000;

    const timeDifference = endDate - startDate;

    const valid = timeDifference >= thirtyMinutes && timeDifference <= twoHours;

    if (!valid) {
      throw new NotAcceptableException("Meeting time is invalid");
    }
  }

  private checkMeetingsSameTime(
    startAt: string,
    endAt: string,
    meetingStart: string,
    meetingEnd: string
  ) {
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    const meetingStartDate = new Date(meetingStart);
    const meetingEndDate = new Date(meetingEnd);
    return (
      (startDate >= meetingStartDate && startDate <= meetingEndDate) ||
      (endDate >= meetingStartDate && endDate <= meetingEndDate) ||
      (meetingStartDate >= startDate && meetingStartDate <= endDate) ||
      (meetingEndDate >= startDate && meetingEndDate <= endDate)
    );
  }
}
