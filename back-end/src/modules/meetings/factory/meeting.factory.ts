import { AppDataSource } from "../../../database/database";
import { userService } from "../../users/factory/users.factory";
import { MeetingController } from "../controllers/meeting.controller";
import { Meeting } from "../entity/meeting.entity";
import { MeetingRepository } from "../repository/meeting.repository";
import { MeetingService } from "../services/meeting.service";

function meetingFactory() {
  const meetingRepository = new MeetingRepository()
  const meetingService = new MeetingService(meetingRepository, userService);
  const meetingController = new MeetingController(meetingService);

  return { meetingController };
}

export const { meetingController } = meetingFactory();
