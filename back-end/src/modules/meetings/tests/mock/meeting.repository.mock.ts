import { UpdateResult, DeleteResult } from "typeorm";
import { IdUserDTO } from "../../../users/dtos/idUser.dto";
import { CreateMeetingDTO } from "../../dtos/createMeenting.dto";
import { IdMeetingDTO } from "../../dtos/idMeeting.dto";
import { UpdatedMeetingDTO } from "../../dtos/updateMeeting.dto";
import { Meeting } from "../../entity/meeting.entity";
import { IMeetingRepository } from "../../repository/meeting.repository.interface";
import { meetingScheduledMock, meetingScheduledMock2, meetingScheduledMock3, meetingScheduledMock4, newMeetingMock } from "./meeting.mock";

export class MeetingRepositoryMock implements IMeetingRepository{
    async getMeetingsByUser({ idUser }: IdUserDTO): Promise<Meeting[]> {
        if(!idUser){
            return [meetingScheduledMock]
        }
        const meetings = [meetingScheduledMock, meetingScheduledMock2, meetingScheduledMock3, meetingScheduledMock4]
        return meetings.filter(m => m.idCustomer === idUser || m.idBroker === idUser)
    }
    async getMeeting({ idMeeting }: IdMeetingDTO): Promise<Meeting[]> {
        const meetings = [meetingScheduledMock, meetingScheduledMock2, meetingScheduledMock3, meetingScheduledMock4]
        return meetings.filter(m => m.idMeeting === idMeeting)
    }
    async exist(where: Partial<Meeting>): Promise<boolean> {
        return where.idMeeting === meetingScheduledMock.idMeeting
    }
    async findOneBy(where: Partial<Meeting>): Promise<Meeting | null> {
        if(where.idMeeting === meetingScheduledMock.idMeeting){
            return meetingScheduledMock
        }

        return null
    }
    async save(createMeetingDTO: CreateMeetingDTO): Promise<Meeting> {
        return newMeetingMock
    }
    async update({ idMeeting }: IdMeetingDTO, updateMeetingDTO: UpdatedMeetingDTO): Promise<UpdateResult> {
        const affected: UpdateResult = {generatedMaps: [], raw: '', affected: 0}
        if(idMeeting === meetingScheduledMock.idMeeting){
            affected.affected = 1
            return affected
        }

        return affected
    }
    async delete({ idMeeting }: IdMeetingDTO): Promise<DeleteResult> {
        const affected: UpdateResult = {generatedMaps: [], raw: '', affected: 0}
        if(idMeeting === meetingScheduledMock.idMeeting){
            affected.affected = 1
            return affected
        }

        return affected
    }

}