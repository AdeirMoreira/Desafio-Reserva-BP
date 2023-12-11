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
import { USER_ROLE, USER_ROLE_PT } from "../../../constants/index.constant";
import { IdUserDTO } from "../../users/dtos/idUser.dto";
import { IMeetingRepository } from "../repository/meeting.repository.interface";
import UserContext from "../../../shared/utils/context/userContext";
import { ERROR_MESSAGES } from "../../../constants/errorMessages.constant";

export class MeetingService implements IMeetingService {
  constructor(
    private readonly meetingRepository: IMeetingRepository,
    private readonly userService: IUserService
  ) {}

  async getMeetingsByUser(idUserDTO: IdUserDTO): Promise<Meeting[]> {
    return this.meetingRepository.getMeetingsByUser(idUserDTO);
  }

  async getMeeting(idMeetingDTO: IdMeetingDTO): Promise<Meeting[]> {
    return this.meetingRepository.getMeeting(idMeetingDTO);
  }

  async createMeeting({
    idBroker,
    idCustomer,
    startAt,
    endAt,
  }: CreateMeetingDTO): Promise<CreateMeetingDTO[]> {
    this.isValidMeetingDate(startAt, endAt);

    const promises = [
      this.userService.findBy({ idUser: idBroker, role: USER_ROLE.BROKER }),
      this.userService.findBy({ idUser: idCustomer, role: USER_ROLE.CUSTOMER }),
    ];

    let [searchedBroker, searchedCostumer] = await Promise.allSettled(promises);
    const broker = this.handleFulfilled(searchedBroker, USER_ROLE_PT.BROKER);
    const costumer = this.handleFulfilled(
      searchedCostumer,
      USER_ROLE_PT.CUSTOMER
    );

    this.checkBrokerMettings(startAt, endAt, broker as User);
    this.checkCustomerMettings(startAt, endAt, costumer as User);

    await this.meetingRepository.save({
      idBroker,
      idCustomer,
      startAt,
      endAt,
    });

    const idUser = UserContext.getInstance().getUserId() as number;
    return this.meetingRepository.getMeetingsByUser({ idUser });
  }

  async updateMeeting(
    { idMeeting }: IdMeetingDTO,
    updateMeetingDTO: UpdatedMeetingDTO
  ): Promise<Meeting[]> {
    const meeting = await this.meetingRepository.findOneBy({ idMeeting });

    if (!meeting) {
      throw new NotFoundException(ERROR_MESSAGES.MEETING_NOT_FOUND);
    }

    if (updateMeetingDTO.idBroker) {
      const broker = await this.userService.findBy({
        idUser: updateMeetingDTO.idBroker,
        role: USER_ROLE.BROKER,
      });

      if (!broker) {
        throw new NotFoundException(ERROR_MESSAGES.BROKER_NOT_FOUND);
      }
    }

    if (updateMeetingDTO.idCustomer) {
      const customer = await this.userService.findBy({
        idUser: updateMeetingDTO.idCustomer,
        role: USER_ROLE.CUSTOMER,
      });

      if (!customer) {
        throw new NotFoundException(ERROR_MESSAGES.CUSTOMER_NOT_FOUND);
      }
    }

    if (updateMeetingDTO.startAt || updateMeetingDTO.endAt) {
      const promises = [
        this.userService.findBy({
          idUser: meeting.idBroker,
          role: USER_ROLE.BROKER,
        }),
        this.userService.findBy({
          idUser: meeting.idCustomer,
          role: USER_ROLE.CUSTOMER,
        }),
      ];

      const [brokerMeetings, customerMeetings] = await Promise.all(promises);

      if (updateMeetingDTO.startAt && updateMeetingDTO.endAt) {
        this.isValidMeetingDate(
          updateMeetingDTO.startAt,
          updateMeetingDTO.endAt
        );

        this.checkBrokerMettings(
          updateMeetingDTO.startAt,
          updateMeetingDTO.endAt,
          brokerMeetings as User,
          meeting.idMeeting
        );
        this.checkCustomerMettings(
          updateMeetingDTO.startAt,
          updateMeetingDTO.endAt,
          customerMeetings as User,
          meeting.idMeeting
        );

        await this.meetingRepository.update({ idMeeting }, updateMeetingDTO);

        const idUser = UserContext.getInstance().getUserId() as number;
        return this.meetingRepository.getMeetingsByUser({ idUser });
      }

      if (updateMeetingDTO.startAt) {
        this.isValidMeetingDate(updateMeetingDTO.startAt, meeting.endAt);

        this.checkBrokerMettings(
          updateMeetingDTO.startAt,
          meeting.endAt,
          brokerMeetings as User,
          meeting.idMeeting
        );
        this.checkCustomerMettings(
          updateMeetingDTO.startAt,
          meeting.endAt,
          customerMeetings as User,
          meeting.idMeeting
        );
      }

      if (updateMeetingDTO.endAt) {
        this.isValidMeetingDate(meeting.startAt, updateMeetingDTO.endAt);

        this.checkBrokerMettings(
          meeting.startAt,
          updateMeetingDTO.endAt,
          brokerMeetings as User,
          meeting.idMeeting
        );
        this.checkCustomerMettings(
          meeting.startAt,
          updateMeetingDTO.endAt,
          customerMeetings as User,
          meeting.idMeeting
        );
      }
    }

    await this.meetingRepository.update({ idMeeting }, updateMeetingDTO);

    const idUser = UserContext.getInstance().getUserId() as number;
    return this.meetingRepository.getMeetingsByUser({ idUser });
  }

  async deleteMeeting({ idMeeting }: IdMeetingDTO): Promise<Meeting[]> {
    const meeting = await this.meetingRepository.exist({
      idMeeting,
    });

    if (!meeting) {
      throw new NotFoundException(ERROR_MESSAGES.MEETING_NOT_FOUND);
    }

    await this.meetingRepository.delete({ idMeeting });

    const idUser = UserContext.getInstance().getUserId() as number;
    return this.meetingRepository.getMeetingsByUser({ idUser });
  }

  private handleFulfilled = (
    result: PromiseSettledResult<User | null>,
    entityName: string
  ) => {
    if (result.status === "fulfilled" && !result.value) {
      throw new NotFoundException(`${entityName} não encontrado.`);
    }

    return result.status === "fulfilled" && result.value ? result.value : null;
  };

  private checkBrokerMettings(
    startAt: string,
    endAt: string,
    broker: User,
    idMeeting?: number
  ) {
    broker?.brokerMeetings.forEach((m) => {
      let meetingSameTime: boolean = false;

      if (idMeeting !== m.idMeeting) {
        meetingSameTime = this.checkMeetingsSameTime(
          startAt,
          endAt,
          m.startAt,
          m.endAt
        );
      }

      if (meetingSameTime) {
        throw new NotAcceptableException(
          ERROR_MESSAGES.BROKER_MEETING_TIME_CONFLICT({
            startAt: this.formatDate(startAt),
            endAt: this.formatDate(endAt),
            brokerName: broker.name,
            meetingStar: this.formatDate(m.startAt),
            meetingEnd: this.formatDate(m.endAt),
          })
        );
      }
    });
  }

  private checkCustomerMettings(
    startAt: string,
    endAt: string,
    customer: User,
    idMeeting?: number
  ) {
    customer?.customerMeetings.forEach((m) => {
      let meetingSameTime: boolean = false;

      if (idMeeting !== m.idMeeting) {
        meetingSameTime = this.checkMeetingsSameTime(
          startAt,
          endAt,
          m.startAt,
          m.endAt
        );
      }

      if (meetingSameTime) {
        throw new NotAcceptableException(
          ERROR_MESSAGES.CUSTOMER_MEETING_TIME_CONFLICT({
            startAt: this.formatDate(startAt),
            endAt: this.formatDate(endAt),
            meetingStar: this.formatDate(m.startAt),
            meetingEnd: this.formatDate(m.endAt),
          })
        );
      }
    });
  }

  private isValidMeetingDate(start: string, end: string): void {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    const thirtyMinutes = 30 * 60 * 1000;
    const twoHours = 2 * 60 * 60 * 1000;

    const timeDifference = endDate - startDate;

    const valid = timeDifference >= thirtyMinutes && timeDifference <= twoHours;

    if (!valid) {
      throw new NotAcceptableException(ERROR_MESSAGES.INVALID_MEETING_TIME);
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

  private formatDate(stringData: string) {
    let [data, hora] = stringData.split("T");
    data = data.split("-").reverse().join("/");
    hora = hora.slice(0, 5);

    return data + " " + hora;
  }
}
