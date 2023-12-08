import {
  NotAcceptableException,
  NotFoundException,
} from "../../../middleware/error/custonErrors.error";
import { UserServiceMock } from "../../users/mock/user.serice.mock";
import { Meeting } from "../entity/meeting.entity";
import { MeetingService } from "../services/meeting.service";
import {
  meetingScheduledMock,
  meetingScheduledMock2,
  meetingScheduledMock4,
  newMeetingMock,
} from "./mock/meeting.mock";
import { MeetingRepositoryMock } from "./mock/meeting.repository.mock";

describe("Testing: Meeting Service", () => {
  const meetingService = new MeetingService(
    new MeetingRepositoryMock(),
    new UserServiceMock()
  );

  describe("Method getMeeting", () => {
    it("broker 3 meeting sucess", async () => {
      try {
        const result = await meetingService.getMeetings({ idUser: 3 });
        expect(result[0]).toBe(meetingScheduledMock2);
        expect(result[1]).toBe(meetingScheduledMock4);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it("Customer 2 meeting sucess", async () => {
      try {
        const result = await meetingService.getMeetings({ idUser: 2 });
        expect(result[0]).toBe(meetingScheduledMock);
        expect(result[1]).toBe(meetingScheduledMock4);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
  });

  describe("Method createMeeting", () => {
    it("Success", async () => {
      try {
        const result = await meetingService.createMeeting(newMeetingMock);
        expect(result).toBe(newMeetingMock);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it("Fail: invalid meeting start time", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        startAt: "adsfasdfasdf",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: invalid meeting end time", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        endAt: "03/12/2023 16:20",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: meeting lasting less than 30 minutes", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        startAt: "2023-12-03T15:40:12",
        endAt: "2023-12-03T16:00:12",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: meeting lasting more than 2 hours", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        startAt: "2023-12-03T15:40:12",
        endAt: "2023-12-03T18:00:12",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: broker not found", async () => {
      const newMeetingMockFail: Meeting = { ...newMeetingMock, idBroker: 10 };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Broker not found.");
      }
    });

    it("Fail: customer not found", async () => {
      const newMeetingMockFail: Meeting = { ...newMeetingMock, idCustomer: 10 };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Customer not found.");
      }
    });

    it("Fail: broker already has a meeting scheduled", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        idBroker: 1,
        startAt: "2023-12-03T16:30:12",
        endAt: "2023-12-03T17:30:12",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe(
          "It was not possible to schedule the meeting from 03/12/2023 16:30 to 03/12/2023 17:30 because the broker Broker already has a meeting scheduled from 03/12/2023 15:30 to 03/12/2023 17:00."
        );
      }
    });

    it("Fail: customer already has a meeting scheduled", async () => {
      const newMeetingMockFail: Meeting = {
        ...newMeetingMock,
        idCustomer: 4,
        startAt: "2023-12-03T18:00:12",
        endAt: "2023-12-03T20:00:12",
      };
      try {
        const result = await meetingService.createMeeting(newMeetingMockFail);
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe(
          "It was not possible to schedule the meeting from 03/12/2023 18:00 to 03/12/2023 20:00 because you already has a meeting scheduled from 03/12/2023 20:00 to 03/12/2023 22:00."
        );
      }
    });
  });

  describe("Method UpadateMeeting", () => {
    it("Success", async () => {
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: meetingScheduledMock.idMeeting },
          { ...meetingScheduledMock, startAt: "2023-12-03T16:00:12" }
        );
        expect(result).toBe("Affected records: 1");
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it("Fail: meeting not found.", async () => {
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMock.idMeeting },
          newMeetingMock
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Meeting not found.");
      }
    });

    it("Fail: invalid meeting start time", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        startAt: "adsfasdfasdf",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: invalid meeting end time", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        endAt: "03/12/2023 16:20",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: meeting lasting less than 30 minutes", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        startAt: "2023-12-03T18:30:12",
        endAt: "2023-12-03T18:50:12",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: meeting lasting more than 2 hours", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        startAt: "2023-12-03T06:00:12",
        endAt: "2023-12-03T10:00:12",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe("Meeting time is invalid.");
      }
    });

    it("Fail: broker not found", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        idBroker: 10,
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Broker not found.");
      }
    });

    it("Fail: customer not found", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        idCustomer: 10,
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Customer not found.");
      }
    });

    it("Fail: broker already has a meeting scheduled", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        idBroker: 3,
        startAt: "2023-12-03T17:00:12",
        endAt: "2023-12-03T19:00:12",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe(
          "It was not possible to schedule the meeting from 03/12/2023 17:00 to 03/12/2023 19:00 because the broker Broker already has a meeting scheduled from 03/12/2023 17:30 to 03/12/2023 19:00."
        );
      }
    });

    it("Fail: customer already has a meeting scheduled", async () => {
      const newMeetingMockFail: Meeting = {
        ...meetingScheduledMock,
        idCustomer: 4,
        startAt: "2023-12-03T18:30:12",
        endAt: "2023-12-03T20:30:12",
      };
      try {
        const result = await meetingService.updateMeeting(
          { idMeeting: newMeetingMockFail.idMeeting },
          newMeetingMockFail
        );
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotAcceptableException);
        expect(error.message).toBe(
          "It was not possible to schedule the meeting from 03/12/2023 18:30 to 03/12/2023 20:30 because the broker Broker already has a meeting scheduled from 03/12/2023 17:30 to 03/12/2023 19:00."
        );
      }
    });
  });

  describe("Method DeleteMeeting", () => {
    it("Success", async () => {
      try {
        const result = await meetingService.deleteMeeting({ idMeeting: 1 });
        expect(result).toBe("Affected records: 1");
      } catch (error: any) {
        expect(error).toBe(undefined);
      }
    });

    it("Meeting not found", async () => {
      try {
        const result = await meetingService.deleteMeeting({ idMeeting: 10 });
        expect(result).toBe(undefined);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe("Meeting not found.");
      }
    });
  });
});
