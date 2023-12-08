import { Meeting } from "../../entity/meeting.entity";

export const meetingScheduledMock = 
    {
      idMeeting: 1,
      idBroker: 1,
      idCustomer: 2,
      startAt: "2023-12-03T15:30:12",
      endAt: "2023-12-03T17:00:12",
      createdAt: "2023-12-08T12:59:17",
      updatedAt: "2023-12-08T12:59:17",
      deletedAt: "",
    } as Meeting
  ;

  export const meetingScheduledMock2 = 
    {
      idMeeting: 2,
      idBroker: 3,
      idCustomer: 4,
      startAt: "2023-12-03T20:00:12",
      endAt: "2023-12-03T22:00:12",
      createdAt: "2023-12-08T12:59:17",
      updatedAt: "2023-12-08T12:59:17",
      deletedAt: "",
    } as Meeting
  ;

  export const meetingScheduledMock3 = 
  {
    idMeeting: 3,
    idBroker: 1,
    idCustomer: 4,
    startAt: "2023-12-03T17:30:12",
    endAt: "2023-12-03T19:00:12",
    createdAt: "2023-12-08T12:59:17",
    updatedAt: "2023-12-08T12:59:17",
    deletedAt: "",
  } as Meeting
;

export const meetingScheduledMock4 = 
{
  idMeeting: 4,
  idBroker: 3,
  idCustomer: 2,
  startAt: "2023-12-03T18:00:12",
  endAt: "2023-12-03T19:30:12",
  createdAt: "2023-12-08T12:59:17",
  updatedAt: "2023-12-08T12:59:17",
  deletedAt: "",
} as Meeting
;

export const newMeetingMock = {
  idMeeting: 5,
  idBroker: 5,
  idCustomer: 6,
  startAt: "2023-12-03T10:30:00",
  endAt: "2023-12-03T12:00:00",
  createdAt: "2023-12-08T12:59:17",
  updatedAt: "2023-12-08T12:59:17",
  deletedAt: "",
} as Meeting